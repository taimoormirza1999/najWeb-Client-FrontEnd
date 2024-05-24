import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { body } = req;

    try {
      const response = await axios.post(
        `${process.env.API_URL}contactUs`,
        body
      );

      if (response.status === 200) {
        res.status(200).json(response.data);
      } else {
        res.status(response.status).json(response.data);
      }
    } catch (error) {
      console.error('Error in /api/contactus:', error.message);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  } else if (req.method === 'GET') {
    res.status(200).json({
      message: 'Hello World',
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}