const Router = require("koa-router");
const UserController = require("../controller/user");
const router = new Router();

router.post("/register", UserController.register);

router.post("/login", UserController.login);

router.post('/getVertifyToken', UserController.sendEmail2Vertify)

module.exports = router