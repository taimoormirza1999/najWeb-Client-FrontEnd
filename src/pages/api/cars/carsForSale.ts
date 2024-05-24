import axios from 'axios';

export default async function handler(req, res) {
  try {
    // Destructure query parameters from the request object
    const { per_page, page, year, maker, model } = req.query;

    // Make the API request with query parameters
    const response = await axios.get(`${process.env.API_URL}CarsForSale`, {
      params: {
        per_page,
        page,
        year,
        maker,
        model,
      },
    });

    // Send a JSON response with the data received from the API
    res.status(200).json(response.data);
  } catch (error) {
    // Log the error for d ebugging purposes
    console.error('Error fetching data:', error);
    
    // Send an error response with a status code of 500 (Internal Server Error)
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
