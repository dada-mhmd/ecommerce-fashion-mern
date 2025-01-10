import jwt from 'jsonwebtoken';

export const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET); //verify token
    if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid token, not authorized' });
    }
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: 'Invalid token, not authorized' });
  }
};

export default adminAuth;
