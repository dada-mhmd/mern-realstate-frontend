import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    throw new Error('Not authorized, no token');
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      throw new Error('Not authorized, invalid token');
    }
    req.user = user;
    next();
  });
};
