import axios from 'axios';

export default async function handler(req, res) {
  const params: { [key: string]: string } = {};
  if (req.query?.city_id) {
    params.city_id = req.query.city_id;
  }

  if (req.query?.auction_id) {
    params.auction_id = req.query.auction_id;
  }

  if (!process.env.API_URL) {
    console.error('API URL is not defined');
    res.status(500).json([]); 
    return; 
  }

  await axios
    .get(`${process.env.API_URL}general/getAuctionLocations`, {
      params,
    })
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).end(JSON.stringify([]));
    });
}
