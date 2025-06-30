// tokenVerify.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const bearer = req.headers['authorization'];

  if (!bearer) return res.status(403).json({ error: 'No token' });

  const token = bearer.split(' ')[1];
  console.log('verifyToken', token)
  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      console.log("JWT verify error:", err); // ✅ If invalid signature
      return res.status(403).json({ error: 'Invalid token' });
    }
    console.log("Decoded JWT:", decoded); // ✅ Should show { id: ... }
    req.userId = decoded._id;
    next();
  });
};

module.exports = verifyToken;
