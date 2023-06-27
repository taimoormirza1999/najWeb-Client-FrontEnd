import archiver from 'archiver';
import axios from 'axios';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });
  const carId = req.query.car_id || '';
  const type = req.query.type || 'warehouse';
  let data = [];
  axios.defaults.headers.common.Authorization = `Bearer ${session?.token.access_token}`;
  const response = await axios.get(
    `${process.env.API_URL}getImages?type=${type}&car_id=${carId}`
  );
  data = response.data.images;
  const imageUrls = data;
  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', 'attachment; filename=images.zip');
  const archive = archiver('zip', {
    zlib: { level: 9 }, // set compression level
  });
  archive.pipe(res);
  const downloadPromises = imageUrls.map(async (url) => {
    const filename = url.substring(url.lastIndexOf('/') + 1);
    const rsp = await axios.get(url, { responseType: 'stream' });
    archive.append(rsp.data, { name: filename });
  });
  await Promise.all(downloadPromises);
  archive.finalize();
}

export const config = {
  api: {
    responseLimit: false,
    // responseLimit: '8mb',
  },
};
