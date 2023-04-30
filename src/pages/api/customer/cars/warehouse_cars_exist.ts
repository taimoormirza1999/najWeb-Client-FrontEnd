import axios from 'axios';

export default async function handler(req, res) {
  const { method } = req;
  const apiUrl = process.env.API_URL;

  if (method === 'GET') {
    const { id, vin, lotnumber } = req.query;
    const response = await axios.get(`${apiUrl}warehouseCarRequestExist`, {
      params: {
        id,
        vin,
        lotnumber,
      },
    });

    return response?.data
      ? res.status(200).json(response.data)
      : res.status(500).json([]);
  }
  return res.status(500).json([]);
}
