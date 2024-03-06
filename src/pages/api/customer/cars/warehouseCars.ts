import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'; // Import AWS SDK v3
import axios from 'axios';
import formidable from 'formidable';
import fs from 'fs';
import {NextApiRequest} from "next";
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const s3Region = 'me-south-1';
const s3BucketName = process.env.BUCKET_NAME;
const apiUrl = process.env.API_URL;

const parseForm = (req) =>
  new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

const uploadFileToS3 = async (
  s3Client,
  file,
  s3SubKey,
  dbFieldName,
  formData
) => {
  const fileStream = fs.createReadStream(file.filepath);
  const fileExt = file.originalFilename.split('.').pop();
  const destinationFileName = `${formData.fields.lotnumber.trim()}-${
    file.newFilename
  }.${fileExt}`;
  const s3FileKey =
    formData.fields.external_car === '1'
      ? 'uploads/towing_cars'
      : 'uploads/warehouse_cars';
  const params = {
    Bucket: s3BucketName,
    Key: `${s3FileKey}/${s3SubKey}/${destinationFileName}`,
    Body: fileStream,
    ContentType: file.mimetype,
  };
  const command = new PutObjectCommand(params);

  try {
    const result = await s3Client.send(command);
    formData.fields[dbFieldName] = destinationFileName;
    return result.Location;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const handlePostRequest = async (req, res) => {
  try {
    const formData = await Promise.race([
      parseForm(req),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Form parsing timed out')), 5000)
      ),
    ]);

    if (!formData) {
      console.error('Error parsing form data or operation timed out');
      return res
        .status(500)
        .json({ error: 'Error parsing form data or operation timed out' });
    }

    console.log('Form data parsed successfully:', formData);

    const filesObjectKeys = Object.keys(formData.files);
    const s3Client = new S3Client({ region: s3Region });

    console.log('Uploading files to S3...');
    const uploadPromises = Object.values(formData.files).map(
      async (file, i) => {
        const s3SubKey =
          filesObjectKeys[i] === 'invoiceFile' ? 'invoices' : 'photos';
        const dbFieldName =
          filesObjectKeys[i] === 'invoiceFile' ? 'invoice' : 'car_photo';
        return uploadFileToS3(s3Client, file, s3SubKey, dbFieldName, formData);
      }
    );

    const uploadResults = await Promise.allSettled(uploadPromises);
    const failedUploads = uploadResults.filter(
      (result) => result.status === 'rejected'
    );

    if (failedUploads.length > 0) {
      console.error('Some file uploads failed:', failedUploads);
      return res.status(500).json({ error: 'Some file uploads failed' });
    }

    console.log('Files uploaded successfully:', uploadResults);

    console.log('Sending request to API...');

    // temporary log request START
    const folderPath = `./public/car-requests/${
      formData?.fields?.customer_id || 0
    }`;
    const logFileName = `${Date.now()}-${Math.floor(Math.random() * 99999999)}`;
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    const filePath2 = path.join(folderPath, logFileName);
    if (!fs.existsSync(filePath2)) {
      fs.writeFileSync(filePath2, JSON.stringify(formData));
    }
    // temporary log request END

    const response = await axios.post(
      `${apiUrl}warehouseCarRequest`,
      formData,
      { timeout: 5000 }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error:', error.message, error.stack);
    return res
      .status(500)
      .json({ error: `Error sending form data to API, ${error.message}` });
  }
};

export default async function handler(req: NextApiRequest, res) {
  const { method } = req;
  res.setHeader('Cache-Control', 'no-store, max-age=0');

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

  if (req.method === 'POST') {
    return handlePostRequest(req, res);
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


