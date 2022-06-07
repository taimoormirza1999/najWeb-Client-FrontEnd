import axios from 'axios';
import JSZip from 'jszip';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session: any = await getSession({ req });
  const carId = req.query.car_id ? req.query.car_id : '';
  const type = req.query.type ? req.query.type : 'warehouse';
  let arr = [];
  let images;
  const zip = JSZip();
  const fold = zip.folder('images');
  axios.defaults.headers.common.Authorization = `Bearer ${session?.token.access_token}`;
  await axios
    .get(`${process.env.API_URL}getImages?type=${type}&car_id=${carId}`)
    .then(function (response) {
      arr = response.data.images;
    })
    .catch(function (error) {
      console.log(error);
    });
  if (arr && arr.length) {
    console.log(arr);
    await axios
      .all(
        arr.map((endpoint) =>
          axios.get(endpoint, { responseType: 'arraybuffer' })
        )
      )
      .then((results) => {
        images = results.map((r) => r.data);
      });
    images.forEach((d, i) => {
      fold?.file(`img${i}.jpg`, d, { binary: true });
    });
    const fzip = await zip.generateAsync({ type: 'nodebuffer' });
    res.setHeader('Content-Disposition', `attachment; filename="archive.zip"`);
    res.setHeader('Content-Type', 'application/zip');
    res.send(fzip);
  }
}
