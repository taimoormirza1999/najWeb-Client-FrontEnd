import archiver from 'archiver';
import axios from 'axios';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session: any = await getSession({ req });
  const carId = req.query.car_id ? req.query.car_id : '';
  const type = req.query.type ? req.query.type : 'warehouse';
  let data = [];
  axios.defaults.headers.common.Authorization = `Bearer ${session?.token.access_token}`;
  await axios
    .get(`${process.env.API_URL}getImages?type=${type}&car_id=${carId}`)
    // eslint-disable-next-line func-names
    .then(function (response) {
      // handle success
      data = response.data.images;
    });

  const imageUrls = data;

  const archive = archiver('zip', {
    zlib: { level: 9 }, // set compression level
  });

  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', 'attachment; filename=images.zip');

  archive.pipe(res);

  const downloadPromises = imageUrls.map(async (url) => {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const filename = url.substring(url.lastIndexOf('/') + 1);
    archive.append(response.data, { name: filename });
  });

  await Promise.all(downloadPromises);

  archive.finalize();
}
