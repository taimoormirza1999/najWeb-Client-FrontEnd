import axios from 'axios';

export default async function handler(req, res) {
  await axios
    .get(`${process.env.API_URL}getMaker`, {
      params: {
        year: req.query.year,
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
