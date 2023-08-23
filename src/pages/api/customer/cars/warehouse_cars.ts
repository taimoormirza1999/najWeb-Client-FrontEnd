import AWS from 'aws-sdk';
import axios from 'axios';
import formidable from 'formidable';
import fs from 'fs';

const s3BucketName = process.env.BUCKET_NAME;

export default async function handler(req, res) {
  const { method } = req;
  const apiUrl = process.env.API_URL;

  if (method === 'GET') {
    // customer approval
    if (req.query?.id && req.query.approve_payment) {
      const { id } = req.query;

      const response = await axios.post(
        `${apiUrl}warehouseCarRequest/customer/approve`,
        {
          id,
        }
      );

      return response?.data
        ? res.status(200).json(response.data)
        : res.status(500).json({});
    }
    // edit request
    if (req.query?.id) {
      const { id } = req.query;

      const response = await axios.get(`${apiUrl}warehouseCarRequest`, {
        params: {
          id,
        },
      });

      return response?.data
        ? res.status(200).json(response.data)
        : res.status(500).json({});
    }

    const { limit, page, search, externalCar } = req.query;
    const response = await axios.get(`${apiUrl}warehouseCarRequests`, {
      params: {
        limit: limit || 10,
        page: page || 0,
        search: search || '',
        external_car: externalCar,
      },
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });

    return response?.data
      ? res.status(200).json(response.data)
      : res.status(500).json([]);
  }
  if (method === 'POST') {
    res.status(200).json('');
    try {
      const form = new formidable.IncomingForm();
      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error('Error parsing form data:', err);
          res.status(500).json({ error: 'Error parsing form data' });
          return;
        }

        const { external_car } = fields;
        const formData = {
          fields,
        };

        const s3 = new AWS.S3();
        const filesObjecKeys = Object.keys(files);

        const uploadPromises = Object.values(files).map(async (file, i) => {
          const s3SubKey =
            filesObjecKeys[i] === 'invoiceFile' ? 'invoices' : 'photos';
          const dbFieldName =
            filesObjecKeys[i] === 'invoiceFile' ? 'invoice' : 'car_photo';

          const fileStream = fs.createReadStream(file.filepath);
          const fileExt = file?.originalFilename.split('.').pop();
          const destinationFileName = `${fields.lotnumber}-${file.newFilename}.${fileExt}`;
          const s3FileKey =
            external_car === '1'
              ? 'uploads/towing_cars'
              : 'uploads/warehouse_cars';
          const params = {
            Bucket: s3BucketName,
            Key: `${s3FileKey}/${s3SubKey}/${destinationFileName}`,
            Body: fileStream,
            ContentType: file.mimetype,
          };

          const result = await s3.upload(params).promise();
          formData.fields[dbFieldName] = destinationFileName;
          return result.Location;
        });

        await Promise.all(uploadPromises);

        const response = await axios.post(
          `${apiUrl}warehouseCarRequest`,
          formData
        );

        res.status(200).json(response.data);
      });
    } catch (error) {
      console.error('Error', error);
      res
        .status(500)
        .json({ error: `Error sending form data to API, ${error}` });
    }

    return false;
  }
  if (method === 'PUT') {
    try {
      const { id } = req.body;
      const response = await axios.post(
        `${apiUrl}warehouseCarRequest/customer/approve`,
        { id }
      );
      return res.status(200).json(response.data);
    } catch (error) {
      return res.status(500).json({ error: `Error sending form data to API` });
    }
  }
  if (method === 'DELETE') {
    if (!req.query.id) {
      return res.status(500).json([]);
    }
    const { id } = req.query;
    const response = await axios.delete(`${apiUrl}warehouseCarRequest`, {
      data: { id },
    });
    if (response.status === 200) {
      return res.status(200).json(response.data);
    }
    return res.status(500).json(response.data);
  }
  return res.status(500).json([]);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
