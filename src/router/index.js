const Router = require("koa-router");
const glob = require("glob");
const { resolve } = require("path");

const router = new Router({
  prefix: "/api/v1"
});

// 自动加载路由
module.exports = app => {
  const files = glob.sync(resolve(__dirname, "./*.js"));
  files.forEach(filePath => {
    if (!/index.js/.test(filePath)) {
      const _router = require(resolve(__dirname, `${filePath}`));
      router.use(_router.routes(), _router.allowedMethods());
    }
  });

  app.use(router.routes(), router.allowedMethods());
};