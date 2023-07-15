const globalErrorHandler = (err, _, res, __) => {
  const { statusCode = 500, message = 'Server error' } = err;
  res.status(statusCode).json({ message });
};

module.exports = globalErrorHandler;