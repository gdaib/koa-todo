const { User, ...UserUtil } = require("../model/user");
const { secret } = require("../config");
const jwt = require("jsonwebtoken");
const { loginSchema, UserSchema } = require("../schema");

function exceptPassword(user) {
  user = JSON.parse(JSON.stringify(user));
  if (user.password) delete user.password;
  return user;
}

module.exports = {
  async register(ctx, next) {
    const { username, email, password } = UserSchema.validate(ctx.request.body);

    const user = await UserUtil.createUser({
      username,
      email,
      password
    });

    const userData = exceptPassword(user);

    ctx.success("注册成功", {
      ...userData,
      token: jwt.sign(userData, secret, { expiresIn: "2h" })
    });
  },

  async login(ctx, next) {
    const { email, password } = loginSchema.validate(ctx.request.body);

    const db_user = await User.findOne({
      where: {
        email
      }
    });

    if (!UserUtil.verifyPw(password, db_user)) {
      return ctx.error("密码错误", 400);
    }

    const userData = exceptPassword(db_user);

    ctx.success("登录成功", {
      ...userData,
      token: jwt.sign(userData, secret, { expiresIn: "2h" })
    });
  }
};
