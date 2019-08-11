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
      type: Sequelize.TEXT
    },
    completed: {
      type: Sequelize.BOOLEAN
    },
    todo_folder_id: {
      type: Sequelize.INTEGER,
      references: {
        model: TodoFolder,
        key: "id"
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
