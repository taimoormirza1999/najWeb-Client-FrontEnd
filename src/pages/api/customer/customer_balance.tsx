import axios from 'axios';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session: any = await getSession({ req });
  const carId = req.query.car_id ? req.query.car_id : '';
  const type = req.query.type ? req.query.type : 'warehouse';
  let data = '';
  axios.defaults.headers.common.Authorization = `Bearer ${session?.token.access_token}`;
  await axios
    .get(
      `${process.env.API_URL}getCustomerBalance?type=${type}&car_id=${carId}`
    )
    .then(function (response) {
      // handle success
      data = response.data.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  // console.log(data);
  res.status(200).json({ data });
}
