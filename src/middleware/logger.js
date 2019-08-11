module.exports = async (ctx, next) => {
  const start = new Date();
  console.info(
    `logger: method: ${ctx.method}  url: ${
      ctx.url
    } time: ${start.toLocaleString()}`
  );
  await next();
  console.info(
    `logger: method: ${ctx.method}  url: ${ctx.url} 耗时: ${Date.now() -
      start}ms`
  );
};
