import axios from 'axios';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session: any = await getSession({ req });
  const { body } = req;
  axios.defaults.headers.common.Authorization = `Bearer ${session?.token.access_token}`;
  let data: any;
  await axios
    .post(`${process.env.API_URL}changePassword`, {
      password: body.password,
      old_password: body.old_password,
    })
    .then((response) => {
      if (response.data.success === true) {
        data = 'success';
      } else {
        data = 'old_password';
      }
    })
    .catch((error) => {
      console.log(error);
      data = 'tehnical_error';
    });
  res.status(200).json({ data });
}
