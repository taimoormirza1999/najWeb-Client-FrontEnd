import { getToken } from 'next-auth/jwt';

export default async function handler(req, res) {
  const session = await getToken({ req, secret: process.env.JWT_SECRET });

  console.log("=>(check-session.ts:5) session", session);

  if (session) {
    res.status(200).json({
      status: 'success',
      data: {
        session,
      },
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Unauthorized',
    });
  }
}
