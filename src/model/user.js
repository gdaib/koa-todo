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
      unique: true
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING
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

  verifyPw(pw, user) {
    return ph.verify(pw, user.password);
  }
};
