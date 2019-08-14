require("dotenv/config");
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const helmet = require("koa-helmet"); // 处理 sql 注入

const { port } = require("./config");
const initRouter = require("./router");

const catchError = require("./middleware/catch");
const resultMiddleware = require("./middleware/result");
const { accessLogger } = require("./middleware/logger");
const { ui } = require("swagger2-koa");

const app = new Koa();

app.use(accessLogger());
app.use(catchError);
app.use(resultMiddleware);

app.use(helmet());
app.use(bodyParser());

initRouter(app)

// 加载 swagger 文档
app.use(ui(require('./apidoc.json'), "/api", ["/api/v1"]));

app.on("error", (err, ctx) => {
  // 记录异常日志
  console.error(err);
});

// 404 处理
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
