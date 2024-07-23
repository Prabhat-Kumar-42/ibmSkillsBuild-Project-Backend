const { verifyToken } = require("../utility/authToken.util");
const throwError = require("../utility/throwError.util");

const checkAuth = (req, res, next) => {
  const authScheme = "Bearer";
  const authorization = req.get("Authorization");
  if (!authorization) {
    return throwError(400, "login required");
  }
  if (!authorization.startsWith(authScheme)) {
    return throwError(400, "invalid auth scheme");
  }
  const token = authorization.slice(authScheme.length + 1);
  const user = verifyToken(token);
  req.user = user;
  next();
};

module.exports = {
  checkAuth,
};
