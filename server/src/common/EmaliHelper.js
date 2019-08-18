const nodemailer = require("nodemailer");
const { promisify } = require("util");
const { emailConfig } = require("../config");

class EmailHelper {
  constructor() {
    // 初始化
    this.nodemailer = nodemailer.createTransport({
      service: "qq",
      port: 465,
      auth: {
        user: emailConfig.user,
        pass: emailConfig.pass
      }
    });

    this.nodemailer.sendMail = promisify(this.nodemailer.sendMail);

    // 邮箱服务是否验证可以使用
    this.isVertify = false;
    this.vertifyEmail();
  }

  vertifyEmail() {
    this.nodemailer.verify((error, success) => {
      if (error) {
        console.error("邮箱服务异常，将在半个小时后重新尝试连接");
        setTimeout(() => this.vertifyEmail(), 60 * 30 * 100);
      } else {
        this.isVertify = true;
        console.log("邮箱服务运行正常，可以正常使用服务");
      }
    });
  }

  /**
   * 发送邮箱
   * @param {} param0
   * email 要发送的邮箱
   * title 邮箱主题
   * content 邮箱内容，可以使用 html
   */
  sendMail({ email, title, content }) {
    if (!this.isVertify) {
      throw new Error("邮箱服务未连接");
    }
    this.nodemailer.sendMail({
      from: emailConfig.user,
      to: email,
      subject: title, // 邮件主题
      html: content // 内容
    });
  }

  sendVerifyEmail({ email, token, vertifyUrl }) {
    const link = `${vertifyUrl}?token=${token}`;
    const html = `
      <p>您好，感谢您在 TODO任务系统 注册账户</p>

      <p>请点击下方链接进行验证</p>

      <a href="${link}">点击验证邮箱</a>
      
      <p>-- TODO任务系统，个人的记事本</p>

      <p>祝您生活愉快每一天。</p>
      `
      console.log(html)
    this.sendMail({
      title: "【TODO任务系统邮箱激活邮件】",
      email,
      content: html
    });
  }
}


module.exports = EmailHelper;
