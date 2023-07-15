const notFoundHandler = (_, res, next) => {
  res.status(404).json({ message: "This page does not exist. Please, check the documentation" });
};

module.exports = notFoundHandler;