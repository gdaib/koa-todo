const { Todo } = require("../model/todo");

module.exports = {
  async create(ctx, next) {
    const { todo_folder_id, text, completed } = ctx.request.body;
    let todo = await Todo.create({
      todo_folder_id,
      text,
      completed
    });
    ctx.success("创建成功", todo);
  },

  async edit(ctx, next) {
    const {
      text = null,
      completed = null,
      todo_folder_id = null
    } = ctx.request.body;

    const id = ctx.params.id;

    const todo = await Todo.findOne({
      where: {
        id
      }
    });

    if (text) todo.text = text;
    if (completed) todo.completed = completed;
    if (todo_folder_id) todo.todo_folder_id = todo_folder_id;
    await todo.save();

    ctx.success("保存成功", true);
  },

  async show(ctx, next) {
    const id = ctx.params.id;

    const todo = await Todo.findOne({
      where: {
        id
      }
    });

    ctx.success("查询成功", todo);
  },

  async delete(ctx, next) {
    const id = ctx.params["id"];
    await Todo.destroy({
      where: {
        id
      }
    });
    ctx.success("删除成功", true);
  }
};
