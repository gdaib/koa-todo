const sq =  require("../db");
const Sequelize = require("sequelize");
const { TodoFolder } =  require("./todoFolder");

const Todo = sq.define(
  "todo",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    text: {
      type: Sequelize.TEXT,
      validate: {
        len: {
          args: [1, 12],
          msg: "任务内容必须是 1 到 12 字符之间"
        }
      }
    },
    completed: {
      type: Sequelize.BOOLEAN,
      validate: {
        notEmpty: true,
        isBoolean: {
          msg: "completed 字段必须为 boolean 类型"
        }
      }
    },
    todo_folder_id: {
      type: Sequelize.INTEGER,
      references: {
        model: TodoFolder,
        key: "id",
        msg: 'TTTTTT'
      }
    }
  },
  {
    freezeTableName: true // 模型名字与表名相同
  }
);

TodoFolder.hasMany(Todo, { as: "Todos", foreignKey: "todo_folder_id" });

module.exports = {
  Todo
};
