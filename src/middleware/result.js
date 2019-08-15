const ErrorException = require("../common/ErrorException");
const Store = require('../common/store.js')

module.exports = async (ctx, next) => {
  ctx.ErrorException = ErrorException;

  ctx.$emailStore = new Store('$email')

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
