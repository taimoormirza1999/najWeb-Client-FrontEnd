import axios from 'axios';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session: any = await getSession({ req });
  const vehicleType = req.query.vehicle_type ? req.query.vehicle_type : '';
  const auctionLocation = req.query.auction_location
    ? req.query.auction_location
    : '';
  const port = req.query.port ? req.query.port : '';
  axios.defaults.headers.common.Authorization = `Bearer ${session?.token.access_token}`;
  await axios
    .get(`${process.env.API_URL}shippingCalculator`, {
      params: {
        vehicle_type: vehicleType,
        auctionLocation,
        port,
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
