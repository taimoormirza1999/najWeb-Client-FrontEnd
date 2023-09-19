import axios from 'axios';

export default async function handler(req, res) {
  const { method } = req;
  const vinApiUrl = process.env.VIN_API_URL;
  const vinApiKey = process.env.VIN_API_KEY;

  if (method === 'GET') {
    return res.status(200).json([]);
    const { vin } = req.query;
    let vehicleData = {};
    if (vin && vinApiUrl !== undefined) {
      const response = await axios.get(`${vinApiUrl}${vin}?${vinApiKey}`);
      const year = response.data.years[0].year ?? '';
      const type = response.data.categories.vehicleType ?? '';
      const make = response.data.make.name ?? '';
      const model = response.data.model.name ?? '';
      vehicleData = {
        vin,
        year,
        type,
        make,
        model,
      };
    }
    return res.status(200).json(vehicleData);
  }
  return res.status(500).json([]);
}
