import archiver from 'archiver';
import axios from 'axios';
import fs from 'fs';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });
  const carId = req.query.car_id || '';
  const type = req.query.type || 'warehouse';
  let data = [];
  axios.defaults.headers.common.Authorization = `Bearer ${session?.token.access_token}`;
  const resp = await axios.get(
    `${process.env.API_URL}getImages?type=${type}&car_id=${carId}`
  );
  data = resp.data.images;
  const imageUrls = data;
  const archive = archiver('zip', {
    zlib: { level: 9 }, // set compression level
  });

  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', 'attachment; filename=images.zip');

  archive.pipe(res);

  const downloadPromises = imageUrls.map(async (url) => {
    const response = await axios.get(url, { responseType: 'stream' });
    const filename = url.substring(url.lastIndexOf('/') + 1);
    archive.append(response.data, { name: filename });
  });

  await Promise.all(downloadPromises);

  archive.finalize();

  // Create a temporary file to stream the ZIP data
  const tempFilePath = '/tmp/images.zip';
  const outputStream = fs.createWriteStream(tempFilePath);
  archive.pipe(outputStream);

  archive.on('error', (err) => {
    console.error('Failed to create the ZIP archive:', err);
    res.status(500).end();
  });

  outputStream.on('close', () => {
    // Stream the temporary file to the response
    const readStream = fs.createReadStream(tempFilePath);
    readStream.pipe(res);
  });
}
