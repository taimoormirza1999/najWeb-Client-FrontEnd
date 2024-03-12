import axios from 'axios';

export default async function handler(req, res) {
  await axios
    .get(`${process.env.API_URL}carStatement/deposit/detail`, {
      params: {
        deposit_id: req.query.deposit_id,
      },
    })
    .then((response) => {
      return res.status(200).json(response.data);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500);
    });
  return res.status(500);
}
