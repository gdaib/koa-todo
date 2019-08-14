const Router = require("koa-router");
const jwt = require("../middleware/jwt");
const FolderController = require("../controller/folder");

const router = new Router({
  prefix: "/folder"
});

router.use(jwt);

router.get("/", FolderController.getAll);

router.get("/:id", FolderController.show);

router.post("/", FolderController.create);

router.put("/:id", FolderController.edit);

router.delete("/:id", FolderController.delete);

module.exports = router;
