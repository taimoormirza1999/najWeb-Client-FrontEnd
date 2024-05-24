import axios from 'axios';

export default async function handler(req, res) {
  try {
    const data = await axios.get(`${process.env.API_URL}general/getStates`, {
      params: {
        region_id: req.query.region_id,
      },
    }).then(response => response.data);

    res.end(JSON.stringify(data));
  } catch (error) {
    console.log(error);
    res.status(500).end(JSON.stringify([]));
  }
}
