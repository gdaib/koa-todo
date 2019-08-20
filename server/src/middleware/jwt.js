const utils = require("../common/utils");
const ErrorException = require("../common/ErrorException");

module.exports = async (ctx, next) => {
  const token = (ctx.headers["authorization"] || "").replace("Bearer ", "");

  try {
    const user = utils.parseJwtToken(token);

    ctx.user = user;
  } catch (error) {
    console.log(error);
    throw new ErrorException("token 无效或者已经过期", 401);
  }

  await next();
};
