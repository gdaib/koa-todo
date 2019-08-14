const Router = require("koa-router");
const UserController = require("../controller/user");
const router = new Router();

router.post("/register", UserController.register);

router.post("/login", UserController.login);

module.exports = router