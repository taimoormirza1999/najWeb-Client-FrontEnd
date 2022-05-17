import axios from 'axios';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session: any = await getSession({ req });
  const searchValue = req.query.lot_vin ? req.query.lot_vin : '';
  axios.defaults.headers.common.Authorization = `Bearer ${session?.token.access_token}`;
  await axios
    .get(`${process.env.API_URL}getTrackSearch`, {
      params: {
        lot_vin: searchValue,
      },
    })
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500);
    });
}
