const Router = require("koa-router");

const router = new Router({
  prefix: "/api/v1"
});

const todo = require("./todo");
const user = require("./user");
const todoFloder = require("./todoFloder");

router.use(todo.routes(), todo.allowedMethods());
router.use(user.routes(), user.allowedMethods());
router.use(todoFloder.routes(), todoFloder.allowedMethods());

module.exports = app => {
  app.use(router.routes(), router.allowedMethods());
};
