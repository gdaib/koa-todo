const { TodoFolder } = require("../model/todoFolder");
const { Todo } = require("../model/todo");

module.exports = {
  async create(ctx, next) {
    const { title } = ctx.request.body;

    const folder = await TodoFolder.create({
      user_id: ctx.request.user.id,
      title
    });

    ctx.success("创建成功", folder);
  },

  async edit(ctx, next) {
    const id = ctx.params.id;
    const { title } = ctx.request.body;

    let folder = await TodoFolder.findOne({
      where: {
        id
      }
    });
    if (title) folder.title = title;
    await folder.save();

    ctx.success("保存成功", folder);
  },

  async show(ctx, next) {
    const id = ctx.params.id;
    const folder = await TodoFolder.findOne({
      where: {
        id
      }
    });
    ctx.success("查询成功", folder);
  },
  async delete(ctx, next) {
    const id = ctx.params.id;

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

    ctx.success("删除成功");
  }
};
