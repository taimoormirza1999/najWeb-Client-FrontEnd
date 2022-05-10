import axios from 'axios';

/*

this is very basic example of how to use axios to make external api calls
usually you will want to secure the api,
this api is only reachable from the same project since we used postData()

also manually checking the method ist recommend,will change this to multer handler and  next-connect middleware in the future
*/

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { body } = req;

    const response = await axios.post(
      `${process.env.API_URL}submitComplaint`,
      body
    );
    if (response.status === 200) {
      res.status(200).json(response.data);
    } else {
      res.status(500).json(response.data);
    }

  }
  if (req.method === 'GET') {
    res.status(200).json({
      message: 'Hello World'
    });
  }
}
