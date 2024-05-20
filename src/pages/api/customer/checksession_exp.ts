// pages/api/check-session.js
import { getToken } from 'next-auth/jwt';

export default async function handler(req, res) {
  try {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Unauthorized',
      });
    }

    // Check if the token is expired
    const currentTime = Date.now();
    const isExpired = currentTime >= token.expires_in;

    if (isExpired) {
      return res.status(401).json({
        status: 'error',
        message: 'Token expired',
      });
    }
    
    return res.status(200).json({
      status: 'success',
      data: {
        session: token,
      },
    });
  } catch (error) {
    console.error('Error checking session:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
}
