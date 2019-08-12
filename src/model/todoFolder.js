const sq = require("../db");
const Sequelize = require("sequelize");
const { User } = require("./user");

const TodoFolder = sq.define(
  "todo_folder",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.TEXT,
      unique: true
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: User,
        key: "id"
      }
    }
  },
  {
    timestamps: false, // 关闭时间戳
    freezeTableName: true // 模型名字与表名相同
  }
);

User.hasMany(TodoFolder, {
  constraints: false,
  as: "Folders",
  foreignKey: "user_id"
});

module.exports = { TodoFolder };
