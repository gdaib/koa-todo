const { logger } = require("./logger");


module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    let message = error.message || "未知错误";
    let code = error.code || 500;
    logger.error(error) // 打印错误日志

    if (code == 401) {
      ctx.status = 401;
    }
    // 增加 orm 抛出异常捕捉
    if (error.name == "SequelizeUniqueConstraintError") {
      code = 500;
      message = error.errors.map(({ message }) => message).join("\n");
    }

    if (error.name === "SequelizeValidationError") {
      code = 400;
      message = error.errors.map(({ message }) => message).join("\n");
    }

    // ctx.status = code;
    ctx.error(message, code);
  }
};
