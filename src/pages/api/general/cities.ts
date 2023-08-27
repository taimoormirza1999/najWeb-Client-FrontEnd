import axios from 'axios';

export default async function handler(req, res) {
  await axios
    .get(`${process.env.API_URL}general/getCities`, {
      params: {
        state_id: req.query.state_id,
      },
    })
    .then((response) => {
      res.end(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
      res.status(500).end([]);
    });
}
