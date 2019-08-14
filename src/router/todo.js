const Router = require("koa-router");
const jwt = require('../middleware/jwt')
const TodoController = require("../controller/todo");

const router = new Router({
  prefix: "/todo"
});

router.use(jwt);

router.get("/", TodoController.getAll);

router.get("/:id", TodoController.show);

router.post("/", TodoController.create);

router.put("/:id", TodoController.edit);

router.delete("/:id", TodoController.delete);

module.exports = router;
