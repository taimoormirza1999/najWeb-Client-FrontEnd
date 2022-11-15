import axios from 'axios';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session: any = await getSession({ req });
  let data = '';
  axios.defaults.headers.common.Authorization = `Bearer ${session?.token.access_token}`;
  // console.log(session);
  await axios
    .get(`${process.env.API_URL}getGeneralNotification`)
    .then(function (response) {
      // handle success
      data = response.data;
    })
    .catch(function (error) {
      // console.log(error);
    });
  // console.log(data);
  res.status(200).json({ data });
}
