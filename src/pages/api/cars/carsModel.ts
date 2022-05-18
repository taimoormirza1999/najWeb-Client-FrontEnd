import axios from 'axios';

export default async function handler(req, res) {
  await axios
    .get(`${process.env.API_URL}getModel`, {
      params: {
        maker_id: req.query.maker_id,
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
