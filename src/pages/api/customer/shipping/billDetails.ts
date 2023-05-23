import axios from 'axios';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session: any = await getSession({ req });
  axios.defaults.headers.common.Authorization = `Bearer ${session?.token.access_token}`;
  const { car_id: carId, currency } = req.query;

  await axios
    .get(`${process.env.API_URL}car/shippingBillDetailPrint/${carId}`, {
      params: { currency },
    })
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500);
    });
}
