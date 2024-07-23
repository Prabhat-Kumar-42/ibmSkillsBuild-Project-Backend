const throwError = (statusCode, message) => {
  const error = Error(message);
  error.status = statusCode;
  throw error;
};

module.exports = throwError;
