import axios from 'axios';

export default async function handler(req, res) {
  await axios
    .get(`${process.env.API_URL}general/getCountryPorts`, {
      params: {
        country_id: req.query.country_id || null,
        limit: req.query.limit || 10,
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
