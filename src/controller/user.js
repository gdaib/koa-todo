const { User, ...UserUtil } = require("../model/user");
const { createJwtToken } = require("../common/utils");
const { Op } = require("sequelize");

function exceptPassword(user) {
  user = JSON.parse(JSON.stringify(user));
  if (user.password) delete user.password;
  return user;
}

module.exports = {
  async register(ctx, next) {
    const { username, email, password } = ctx.request.body;

    let user = await UserUtil.findOneByUsername(username);

    if (user) {
      console.log(user);
      throw new ctx.ErrorException({
        message: "用户名已被注册",
        code: 1000
      });
    }

    user = await UserUtil.findOneByEmail(email);

    if (user) {
      throw new ctx.ErrorException({
        message: "邮箱已被注册",
        code: 1001
      });
    }

    const data = await UserUtil.createUser({
      username,
      email,
      password
    });

    const userData = exceptPassword(data);

    ctx.success("注册成功", {
      ...userData,
      token: createJwtToken(userData)
    });
  },

  async login(ctx, next) {
    const { account, password } = ctx.request.body;

    const db_user = await User.findOne({
      where: {
        [Op.or]: {
          email: account,
          username: account
        }
      }
    });

    if (!db_user) {
      throw new ctx.ErrorException({
        message: "用户不存在",
        code: 1002
      });
    }

    if (!UserUtil.verifyPw(password, db_user)) {
      return ctx.error("密码错误", 400);
    }

    const userData = exceptPassword(db_user);

    ctx.success("登录成功", {
      ...userData,
      token: createJwtToken(userData)
    });
  }
};
