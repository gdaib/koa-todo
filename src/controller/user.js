const { User, ...UserUtil } = require("../model/user");
const { createJwtToken } = require("../common/utils");
const { Op } = require("sequelize");
const ErrorException = require("../common/ErrorException");


function exceptPassword(user) {
  user = JSON.parse(JSON.stringify(user));
  if (user.password) delete user.password;
  return user;
}

module.exports = {
  async register(ctx, next) {
    const { username, email, password } = ctx.request.body;

    if (!username) {
      throw new ErrorException("用户名为必填项");
    }

    let user = await UserUtil.findOneByUsername(username);

    if (user) {
      throw new ErrorException("用户名已被注册");
    }

    user = await UserUtil.findOneByEmail(email);

    if (user) {
      throw new ErrorException("邮箱已被注册");
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

    if (!account) {
      throw new ErrorException("请输入用户名/邮箱地址");
    }
    const db_user = await User.findOne({
      where: {
        [Op.or]: {
          email: account,
          username: account
        }
      }
    });

    if (!db_user) {
      throw new ErrorException("用户不存在");
    }

    if (!UserUtil.verifyPw(password, db_user)) {
      throw new ErrorException("密码错误");
    }

    const userData = exceptPassword(db_user);

    ctx.success("登录成功", {
      ...userData,
      token: createJwtToken(userData)
    });
  }
};
