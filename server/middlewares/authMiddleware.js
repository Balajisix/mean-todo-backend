const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if(!authHeader) {
    return res.status(401).json({ error: 'No Token Provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId };
    next();
  } catch(err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = authMiddleware;