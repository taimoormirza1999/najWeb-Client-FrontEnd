import axios from 'axios';
import formidable from 'formidable';

export default async function handler(req, res) {
  const { method } = req;
  const apiUrl = process.env.API_URL;

  if (method === 'GET') {
    // customer approval
    if (req.query?.id && req.query.approve_payment) {
      const { id } = req.query;

      const response = await axios.post(
        `${apiUrl}warehouseCarRequest/customer/approve`,
        {
          params: {
            id,
          },
        }
      );

      console.log(response);

      return response?.data
        ? res.status(200).json(response.data)
        : res.status(500).json({});
    }
    // edit request
    if (req.query?.id) {
      const { id } = req.query;

      const response = await axios.get(`${apiUrl}warehouseCarRequest`, {
        params: {
          id,
        },
      });

      return response?.data
        ? res.status(200).json(response.data)
        : res.status(500).json({});
    }

    const { limit, page, search } = req.query;
    const response = await axios.get(`${apiUrl}warehouseCarRequests`, {
      params: {
        limit: limit || 10,
        page: page || 0,
        search: search || '',
      },
    });

    return response?.data
      ? res.status(200).json(response.data.data)
      : res.status(500).json([]);
  }
  if (method === 'POST') {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data:', err);
        res.status(500).json({ error: 'Error parsing form data' });
        return;
      }

      try {
        const response = await axios.post(`${apiUrl}warehouseCarRequest`, {
          fields,
          files,
        });
        console.log('Form data sent successfully:', response.data.data);
        res.status(200).json(response.data);
      } catch (error) {
        console.error('Error', error);
        res
          .status(500)
          .json({ error: `Error sending form data to API, ${error}` });
      }
    });

    return false;
  }
  if (method === 'POSTTT') {
    const form = new formidable.IncomingForm();
    // const session: any = await getSession({ req });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: 'Error parsing form data' });
        return;
      }

      try {
        const response = await axios.post(`${apiUrl}/warehouseCarRequest`, {
          fields,
          files,
        });
        res.status(200).json(response);
      } catch (error) {
        res.status(500).json({ error: 'Error sending form data to API' });
      }
    });

    /* const response = await axios.posnt(`${apiUrl}warehouseCarRequest`, body);
    if (response.status === 200) {
      return res.status(200).json(response.data);
    }
    return res.status(500).json(response.data); */
  }
  if (method === 'PUT') {
    try {
      const { id } = req.body;
      console.log('id, ', id);
      const response = await axios.post(
        `${apiUrl}warehouseCarRequest/customer/approve`,
        { id }
      );
      return res.status(200).json(response.data);
    } catch (error) {
      return res.status(500).json({ error: `Error sending form data to API` });
    }
  }
  if (method === 'DELETE') {
    if (!req.query.id) {
      return res.status(500).json([]);
    }
    const { id } = req.query;
    const response = await axios.delete(`${apiUrl}warehouseCarRequest`, {
      data: { id },
    });
    if (response.status === 200) {
      return res.status(200).json(response.data);
    }
    return res.status(500).json(response.data);
  }
  return res.status(500).json([]);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
