import axios from 'axios';
import formidable from 'formidable';
import fs from 'fs';

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

    const { limit, page, search } = req.query;
    const response = await axios.get(`${apiUrl}warehouseCarRequests`, {
      params: {
        limit: limit || 10,
        page: page || 0,
        search: search || '',
      },
    });

    return response?.data
      ? res.status(200).json(response.data.data)
      : res.status(500).json([]);
  }
  if (method === 'POST') {
    try {
      const form = new formidable.IncomingForm();
      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error('Error parsing form data:', err);
          res.status(500).json({ error: 'Error parsing form data' });
          return;
        }

        const formData = {
          fields,
          file: {},
        };

        if (Object.keys(files).length) {
          const fileContent = fs.readFileSync(files?.file?.filepath);
          formData.file = {
            extension: files?.file?.originalFilename.split('.').pop(),
            type: files?.file?.mimetype,
            fileContent: Buffer.from(fileContent).toString('base64'),
          };
        }

        const response = await axios.post(
          `${apiUrl}warehouseCarRequest`,
          formData
        );

        console.log('Form data sent successfully:', response.data.data);
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
