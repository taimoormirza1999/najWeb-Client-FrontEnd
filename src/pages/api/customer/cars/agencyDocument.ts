import AWS from 'aws-sdk';
import axios from 'axios';
import formidable from 'formidable';
import fs from 'fs';

const s3BucketName = process.env.BUCKET_NAME;

export default async function handler(req, res) {
  const { method } = req;
  const apiUrl = process.env.API_URL;

  if (method === 'POST') {
    try {
      const formData = await new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          resolve({ fields, files });
        });
      });

      if (!formData) {
        return res.status(500).json({ error: 'Error parsing form data' });
      }

      const s3 = new AWS.S3();

      const uploadFileToS3 = async (file) => {
        const fileStream = fs.createReadStream(file.filepath);
        const fileExt = file.originalFilename.split('.').pop();
        const destinationFileName = `${file.newFilename}.${fileExt}`;
        const params = {
          Bucket: s3BucketName,
          Key: `uploads/customer_file/agency_documents/${destinationFileName}`,
          Body: fileStream,
          ContentType: file.mimetype,
        };

        const result = await s3.upload(params).promise();
        formData.fields.agency_file = destinationFileName;
        return result.Location;
      };

      const uploadPromises = Object.values(formData.files).map(
        async (file, i) => {
          return uploadFileToS3(file);
        }
      );

      await Promise.all(uploadPromises);

      const response = await axios.post(
        `${apiUrl}customer/agencyDocument`,
        formData.fields
      );

      return res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: `Error sending form data to API, ${error}` });
    }
  } else if (method === 'GET') {
    const { funcName } = req.query;

    if (funcName === 'hasAgencyDocument') {
      const response = await axios.get(`${apiUrl}customer/${funcName}`);

      return response?.data?.data === true
        ? res.status(200).json(true)
        : res.status(500).json({});
    }
  }

  return res.status(500).json([]);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
