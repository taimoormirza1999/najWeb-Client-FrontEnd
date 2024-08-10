// /pages/api/customer/damageCar/lotNumbersDamage.js

import axios from 'axios';

export default async function handler(req, res) {
  const { customer_id } = req.query; // Get customer_id from query parameters

  if (req.method === 'GET') {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}getLotNumbersDamage?customer_id=${customer_id}`;
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
