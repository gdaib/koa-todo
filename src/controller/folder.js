const { TodoFolder } = require("../model/todoFolder");
const { Todo } = require("../model/todo");
const { idSchema } = require("../schema");
const { Op } = require("sequelize");

module.exports = {
  async create(ctx, next) {
    const { title } = ctx.request.body;

    const folder = await TodoFolder.create({
      user_id: ctx.user.id,
      title
    });

    ctx.success("创建成功", folder);
  },

  async edit(ctx, next) {
    const { id } = idSchema.validate(ctx.params);
    const { title } = ctx.request.body;

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
  },

  async getAll(ctx, next) {
    const { pageSize = 10, page = 1, title = "" } = ctx.request.query;

    const { count: total, rows: list } = await TodoFolder.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      where: {
        title: { [Op.like]: `%${title}%` }
      }
    });

    ctx.success("success", { total, list });
  }
};
