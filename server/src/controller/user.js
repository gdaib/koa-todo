const { User, ...UserUtil } = require("../model/user");
const {
  createJwtToken,
  geneateVerifyCode,
  emaliHelper,
  deCodeEmail,
  enCodeEmail
} = require("../common/utils");
const { Op } = require("sequelize");
const ErrorException = require("../common/ErrorException");
const { emailSchema } = require("../schema");

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
    if (!password) {
      throw new ErrorException("密码为必填项");
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
  },

  async sendEmail2Verify(ctx, next) {
    // 验证地址需要从前端发送过来，因为如果真实项目中，会有很多个环境
    const { email, vertifyUrl } = emailSchema.validate(ctx.request.body);

    const user = await UserUtil.findOneByEmail(email);

    if (!user) {
      throw new ErrorException("邮箱未注册", 411);
    }

    // if (!user.vertifyEmail)
    //   throw new ErrorException("邮箱已经验证过，无需重复验证", 411);

    let code = geneateVerifyCode(20);

    const token = enCodeEmail(email, code);

    ctx.$emailStore.set(email, {
      token,
      code
    });

    await emaliHelper.sendVerifyEmail({
      email,
      token,
      vertifyUrl
    });

    ctx.success("success", {
      token
    });
  },

  async verifyEmail(ctx, next) {
    const token = ctx.request.body.token;

    if (!token) throw new ErrorException("token错误", 412);

    const str = deCodeEmail(token);
    const [email, code] = str.split(" ");

    let data = ctx.$emailStore.get(email);

    if (!data) throw new ErrorException("验证token已过期，请重新申请", 414);

    if (data.token !== token || data.code !== code)
      throw new ErrorException("token错误", 412);

    const user = await UserUtil.findOneByEmail(email);

    if (user.verifyEmail)
      throw new ErrorException("邮箱已经验证过，无需重复验证", 415);

    user.verifyEmail = true;
    // 删除token
    ctx.$emailStore.remove(email);

    await user.save();

    ctx.success("验证邮箱成功");
  }
};
