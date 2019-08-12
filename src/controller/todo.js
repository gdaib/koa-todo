const { Todo } = require("../model/todo");
const { createTodo, editTodo, idSchema } = require("../schema");
const { Op } = require("sequelize");

module.exports = {
  async create(ctx, next) {
    const { todo_folder_id, text, completed } = createTodo.validate(
      ctx.request.body
    );

    try {
      let todo = await Todo.create({
        todo_folder_id,
        text,
        completed
      });

      ctx.success("创建成功", todo);
    } catch (error) {
      let message = "系统错误",
        code = 500;

      const { errno } = error.parent;

      if (errno == 19) {
        message = "文件夹不存在";
        code = 409;
      }
      throw new ctx.HttpExceptionError({
        message,
        code
      });
    }
  },

  async edit(ctx, next) {
    const { text = null, completed = null } = editTodo.validate(
      ctx.request.body
    );

    const { id } = idSchema.validate(ctx.params);

    const todo = await Todo.findOne({
      where: {
        id
      }
    });

    if (text) todo.text = text;
    if (completed) todo.completed = completed;
    // if (todo_folder_id) todo.todo_folder_id = todo_folder_id;
    await todo.save();

    ctx.success("更新成功", true);
  },

  async show(ctx, next) {
    const { id } = idSchema.validate(ctx.params);

    const todo = await Todo.findOne({
      where: {
        id
      }
    });

    ctx.success("success", todo);
  },

  async delete(ctx, next) {
    const { id } = idSchema.validate(ctx.params);

    await Todo.destroy({
      where: {
        id
      }
    });
    ctx.success("删除成功", true);
  },

  async getAll(ctx, next) {
    const { pageSize = 10, page = 1, text = "" } = ctx.request.query;

    const { count: total, rows: list } = await Todo.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      where: {
        text: { [Op.like]: `%${text}%` }
      }
    });

    ctx.success("success", { total, list });
  }
};
