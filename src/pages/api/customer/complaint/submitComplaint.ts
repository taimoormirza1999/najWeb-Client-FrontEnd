import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import axios from 'axios';
import formidable from 'formidable';
import fs from 'fs';

/*

this is very basic example of how to use axios to make external api calls
usually you will want to secure the api,
this api is only reachable from the same project since we used postData()

also manually checking the method ist recommend,will change this to multer handler and  next-connect middleware in the future
*/

const s3Region = 'me-south-1';
const s3BucketName = process.env.BUCKET_NAME;
const apiUrl = process.env.API_URL;

export const config = {
  api: {
    bodyParser: false,
  },
};

const parseForm = (req) =>
  new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

const uploadFileToS3 = async (s3Client, file, formData) => {
  const fileStream = fs.createReadStream(file.filepath);
  const fileExt = file.originalFilename.split('.').pop();
  const destinationFileName = `${file.newFilename}.${fileExt}`;
  const s3FileKey = 'upload/complaints';
  const params = {
    Bucket: s3BucketName,
    Key: `${s3FileKey}/${destinationFileName}`,
    Body: fileStream,
    ContentType: file.mimetype,
  };
  const command = new PutObjectCommand(params);

  try {
    const result = await s3Client.send(command);
    formData.fields.complaint_file = destinationFileName;
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

    console.log('Form data parsed successfully:');

    const s3Client = new S3Client({ region: s3Region });
    const uploadPromises = Object.values(formData.files).map(
      async (file) => {
        return uploadFileToS3(s3Client, file, formData);
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
    const response = await axios.post(
      `${apiUrl}submitComplaint`,
      formData.fields
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error:', error.message, error.stack);
    return res
      .status(500)
      .json({ error: `Error sending form data to API, ${error.message}` });
  }
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    handlePostRequest(req, res);
    return;
  }
  if (req.method === 'GET') {
    res.status(200).json({
      message: 'Hello World',
    });
  }
}
