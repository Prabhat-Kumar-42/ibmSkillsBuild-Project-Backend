const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const generateToken = (user) => {
  const userData = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  const token = jwt.sign(userData, JWT_SECRET_KEY);
  return token;
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET_KEY);
};

module.exports = {
  generateToken,
  verifyToken,
};
