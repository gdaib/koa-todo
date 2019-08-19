const sq = require("../db");
const Sequelize = require("sequelize");
const { User } = require("./user");
const sequelizePaginate = require("sequelize-paginate");

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
      unique: true,
      validate: {
        len: {
          args: [1, 12],
          msg: "文件夹标题必须是 1 到 12 字符之间"
        }
      }
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
    // timestamps: false, // 关闭时间戳
    freezeTableName: true // 模型名字与表名相同
  }
);

User.hasMany(TodoFolder, {
  constraints: false,
  as: "Folders",
  foreignKey: "user_id"
});

sequelizePaginate.paginate(TodoFolder)

module.exports = { TodoFolder };
