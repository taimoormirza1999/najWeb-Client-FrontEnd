// pages/api/getDamageParts.js

import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}getDamageParts`);
    const result = response.data;

    const transformedData = result.data.map(part => ({
      key: part.id,
      value: part.name,
    }));

    res.status(200).json({ data: transformedData });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
