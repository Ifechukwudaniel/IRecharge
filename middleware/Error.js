const { BaseError } = require("../Errors/baseErrors");

const errorMiddleWare = (err, req, res, next) => {
  if (err instanceof BaseError) {
    return res
      .status(err.httpCode)
      .send({ title: err.title, message: err.message });
  } else {
    next();
    return res.status(500).send({
      title: "User Error",
      message: "This error happens when  is not computed",
    });
  }
};

module.exports = { errorMiddleWare };
