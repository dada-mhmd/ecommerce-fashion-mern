import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id;
    next();
  } catch (error) {
    console.log(error.message);

    res.status(401).json({ success: false, message: 'Unauthorized' });
  }
};

export default authUser;
