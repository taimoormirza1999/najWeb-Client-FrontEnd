// /pages/api/customer/damageCar/carInfo.js

import axios from 'axios';

export default async function handler(req, res) {
  const { car_id } = req.query; // Get car_id from query parameters

  if (req.method === 'GET') {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}getCarInfo?car_id=${car_id}`;
      const response = await axios.get(apiUrl);

      // Return the data from the API response
      res.status(200).json(response.data);
    } catch (error) {
      // Handle errors
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  } else {
    // Method not allowed
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
