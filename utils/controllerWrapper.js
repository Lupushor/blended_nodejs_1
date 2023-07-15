const controllerWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res);
    } catch (error) {
      next(error)
    }
  };
};

module.exports = controllerWrapper;

// return (req, res, next) => {
//     controller(req, res).catch(next);
//   };