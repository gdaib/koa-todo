const { TodoFolder } = require("../model/todoFolder");
const { Todo } = require("../model/todo");
const { createTodoSchema, idSchema } = require('../schema')


module.exports = {
  async create(ctx, next) {
    const { title } = createTodoSchema.validate(ctx.request.body);

    const folder = await TodoFolder.create({
      user_id: ctx.request.user.id,
      title
    });

    ctx.success("创建成功", folder);
  },

  async edit(ctx, next) {
    const { id } = idSchema.validate(ctx.params);
    const { title } = createTodoSchema.validate(ctx.request.body);

    let folder = await TodoFolder.findByPk(id);

    if (title) folder.title = title;

    await folder.save();

    ctx.success("保存成功", folder);
  },

  async show(ctx, next) {
    const { id } = idSchema.validate(ctx.params);

    let folder = await TodoFolder.findByPk(id);

    ctx.success("查询成功", folder);
  },
  async delete(ctx, next) {

    const { id } = idSchema.validate(ctx.params);

    await Todo.destroy({
      where: {
        todo_folder_id: id
      }
    });

    await TodoFolder.destroy({
      where: {
        id
      }
    });

    ctx.success("删除成功", true);
  }
};
