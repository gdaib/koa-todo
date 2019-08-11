const jwt = require("jsonwebtoken");

module.exports = function({ secret, unless = [] }) {
  if (!secret) {
    throw new Error("请传入秘钥");
  }
  if (!Array.isArray(unless)) {
    throw new Error("unless 必须是数组");
  }

  return async (ctx, next) => {
    if (!unless.length || unless.some(regExp => regExp.test(ctx.url))) {
      await next();
    } else {
      const token = (ctx.headers["authorization"] || "").replace("Bearer ", "");

      try {
        const user = jwt.verify(token, secret);

        ctx.request.user = user;
      } catch (error) {
        throw new ctx.HttpExceptionError({
          message: "token 无效或者已经过期",
          code: 401
        });
      }

      await next();
    }
  };
};
