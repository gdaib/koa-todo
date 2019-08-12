module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    let message = error.message || "未知错误";
    let code = error.code || 500;
    console.log(error);
    // 增加 orm 抛出异常捕捉
    if (error.name == "SequelizeUniqueConstraintError") {
      code = 409;
      message = error.errors.map(({ message }) => message).join("\n");
    }

    ctx.status = code;
    ctx.error(message, code);
  }
};
