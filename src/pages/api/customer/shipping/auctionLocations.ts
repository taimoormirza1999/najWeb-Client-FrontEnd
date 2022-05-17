import axios from 'axios';

export default async function handler(req, res) {
  await axios
    .get(`${process.env.API_URL}getAuctionLocation`, {
      params: {
        auction_id: req.query.auction_id,
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
