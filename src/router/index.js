const Router = require('koa-better-router')
const UserController = require("../controller/user");
const TodoController = require("../controller/todo");
const FolderController =  require("../controller/folder");

const router = Router().loadMethods();
const api = Router({ prefix: "/api/v1" });

api.get("/register", UserController.register);
api.post("/register", UserController.register);
api.post("/login", UserController.login);


api.get("/todo/:id", TodoController.show);
api.post("/todo", TodoController.create);
api.put("/todo/:id", TodoController.edit);
api.del("/todo/:id", TodoController.delete);


api.get("/folder/:id", FolderController.show);
api.post("/folder", FolderController.create);
api.put("/folder/:id", FolderController.edit);
api.del("/folder/:id", FolderController.delete);
// api.addRoute('GET', 'register', UserController.register);

api.extend(router);
module.exports = { api, router };
