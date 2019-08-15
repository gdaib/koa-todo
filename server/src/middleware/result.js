const ErrorException = require("../common/ErrorException");
const Store = require("../common/store.js");

let $emailStore = new Store("$email");

module.exports = async (ctx, next) => {
  ctx.ErrorException = ErrorException;

  ctx.$emailStore = $emailStore;

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
