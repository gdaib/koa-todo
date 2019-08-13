const ErrorException = require("../common/ErrorException");

module.exports = async (ctx, next) => {
  ctx.ErrorException = ErrorException;

  ctx.success = function(message = "success", payload, code = 0) {
    ctx.body = {
      payload,
      message,
      code
    };
  };

  ctx.error = (message, code) => {
    ctx.body = {
      message,
      code
    };
  };

  await next();
};
