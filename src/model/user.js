const sequelize = require("../db");
const Sequelize = require("sequelize");
const ph = require("password-hash");

class User extends Sequelize.Model {}

User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        len: {
          args: [4, 12],
          msg: "用户名长度必须在 4 到 12 个字符之间"
        }
      }
    },
    verifyEmail: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      comment: "邮箱是否已验证"
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isEmail: {
          msg: "请检查邮箱格式是否正确"
        }
      }
    },
    password: {
      type: Sequelize.STRING
      // validate: {
      //   len: {
      //     args: [6, 12],
      //     msg: "密码长度必须在 6 到 12 个字符之间"
      //   }
      // }
    }
  },
  {
    sequelize,
    modelName: "user",
    timestamps: false,
    freezeTableName: true // Model tableName will be the same as the model name
  }
);

module.exports = {
  User,

  async createUser(user) {
    return User.create({
      username: user.username,
      email: user.email,
      password: ph.generate(user.password)
    });
  },

  getOne: User.findById,

  async findOneByUsername(username) {
    return await User.findOne({
      where: {
        username
      }
    });
  },

  async findOneByEmail(email) {
    return await User.findOne({
      where: {
        email
      }
    });
  },

  verifyPw(pw, user) {
    return ph.verify(pw, user.password);
  }
};
