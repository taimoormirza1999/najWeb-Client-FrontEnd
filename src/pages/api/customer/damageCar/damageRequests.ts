// pages/api/damageRequests.js
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const { customer_id } = req.query; // Get customer_id from query parameters
    const url = `${process.env.NEXT_PUBLIC_API_URL}getAllDamageRequest?customer_id=${customer_id}`;
    
    // Fetch data from the external API
    const response = await axios.get(url);

    // Send the response data as JSON
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
}
