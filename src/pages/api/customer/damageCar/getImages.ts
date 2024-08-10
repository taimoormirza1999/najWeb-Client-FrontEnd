

import axios from 'axios';

export default async function handler(req, res) {
  const { car_id, type } = req.query;

  if (!car_id || !type) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    const url =`${process.env.NEXT_PUBLIC_API_URL}getImages?car_id=${car_id}&type=${type}`;
    const response = await axios.get(url);
    const result = response.data;

    if (result?.images?.length > 0) {
      res.status(200).json({ images: result.images });
    } else {
      res.status(200).json({ images: [] });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
