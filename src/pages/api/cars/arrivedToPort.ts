import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { body } = req;

    const response = await axios.post(
      `${process.env.API_URL}car/saveArrivedToPort`,
      body
    );
    if (response.status === 200) {
      res.status(200).json(response.data);
    } else {
      res.status(500).json(response.data);
    }
  }
  if (req.method === 'GET') {
    res.status(200).json({
      message: 'Invalid request',
    });
  }
}
