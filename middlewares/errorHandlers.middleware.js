const throwError = require("../utils/throwError");

const unknownEndpoint = (req, res) => {
  throwError(404, "unknown endpoint");
};

const mongoError = (err, req, res, next) => {
  if (err.name === "CastError") {
    throwError(400, "malformatted id");
  }
  if (err.name === "ValidationError") {
    throwError(400, err.message);
  }
  if (err.name === "MongoServerError" && err.code === 11000) {
    throwError(400, "name must be unique");
  }
  next(err);
};

const jwtError = (err, req, res, next) => {
  if (err.name === "JsonWebTokenError") {
    throwError(400, "invalid token");
  }
  if (err.name === "TokenExpiredError") {
    throwError(400, "token expired, please log in again");
  }
  next(err);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  if (statusCode >= 500) console.error(err.stack);
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ error: message });
};

module.exports = {
  unknownEndpoint,
  mongoError,
  jwtError,
  errorHandler,
};
