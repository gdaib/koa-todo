const { Todo } = require("../model/todo");
const { idSchema } = require("../schema");
const { Op } = require("sequelize");
const ErrorException = require("../common/ErrorException");

module.exports = {
  async create(ctx, next) {
    const { todo_folder_id, text, completed } = ctx.request.body;

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

      if (error.parent) {
        const { errno } = error.parent;
        if (errno == 19) {
          message = "文件夹不存在";
          code = 404;
        }
        throw new ErrorException(message, code);
      } else {
        throw error;
      }
    }
  },

  async edit(ctx, next) {
    const { text = null, completed = null } = ctx.request.body;

    const { id } = idSchema.validate(ctx.params);

    const todo = await Todo.findOne({
      where: {
        id
      }
    });

    if (text) todo.text = text;
    if (completed != null) todo.completed = completed;
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
    const { id } = ctx.params;

    const ids = id.split(',').map(Number)

    await Todo.destroy({
      where: {
        id: ids
      }
    });
    ctx.success("删除成功", true);
  },

  async getAll(ctx, next) {
    const { pageSize = 10, page = 1, text = "" } = ctx.request.query;

    const { docs: list, pages, total } = await Todo.paginate({
      paginate: pageSize,
      page,
      where: {
        text: { [Op.like]: `%${text}%` }
      }
    });

    ctx.success("success", { total, list, pages });
  }
};
