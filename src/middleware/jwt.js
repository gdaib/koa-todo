const utils = require("../common/utils");

module.exports = function({ unless = [] }) {
  if (!Array.isArray(unless)) {
    throw new Error("unless 必须是数组");
  }

  return async (ctx, next) => {
    if (!unless.length || unless.some(regExp => regExp.test(ctx.url))) {
      await next();
    } else {
      const token = (ctx.headers["authorization"] || "").replace("Bearer ", "");

      try {
        const user = utils.parseJwtToken(token);

        ctx.user = user;
      } catch (error) {
        throw new ctx.ErrorException({
          message: "token 无效或者已经过期",
          code: 401
        });
      }

      await next();
    }
  };
};
