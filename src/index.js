require("dotenv/config");
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const helmet = require("koa-helmet"); // 处理 sql 注入

const { port, secret } = require("./config");
const { api, router } = require("./router");

const catchError = require("./middleware/catch");
const resultMiddleware = require("./middleware/result");
const jwtMiddleware = require("./middleware/jwt");
const loggerMiddleware = require("./middleware/logger");

const app = new Koa();

app.use(loggerMiddleware);
app.use(catchError);
app.use(resultMiddleware);
app.use(
  jwtMiddleware({
    secret,
    unless: [/^\/api\/v1\/(login|register)/]
  })
);

app.use(helmet());
app.use(bodyParser());
app.use(router.middleware());
app.use(api.middleware());

app.on("error", (err, ctx) => {
  // 记录异常日志
  console.error(err);
});

app.use(async (ctx, next) => {
  await next();
  if (ctx.status === 404) {
    ctx.error({
      message: `${ctx.url} not found`,
      code: 404
    });
  }
});

app.listen(port, () => {
  console.log(`Server Stared on http://localhost:${port}`);
});
