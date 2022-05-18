import axios from 'axios';

export default async function handler(req, res) {
  await axios
    .get(`${process.env.API_URL}CarsForSale`, {
      params: {
        per_page: req.query.per_page,
        page: req.query.page,
        year: req.query.year,
        maker: req.query.maker,
        model: req.query.model,
      },
    })
    .then((response) => {
      res.end(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
      res.status(500);
    });
}
