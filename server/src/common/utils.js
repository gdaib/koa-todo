const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { jwtConfig, secretkey } = require("../config");
const EmailHelper = require("./EmaliHelper");
const ErrorException = require('./ErrorException')

// 生成 jwt token
const createJwtToken = data =>
  jwt.sign(data, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });

// 解析  token
const parseJwtToken = token => jwt.verify(token, jwtConfig.secret);

// type mixin number char
const geneateVerifyCode = len => {
  const origin =
    "01234567890abcdefghijklmnopqrstuvwsyzABCDEFGHIJKLMNOPQRSTUVWSYZ";
  let result = "";
  for (let i = 0; i < len; i++) {
    result += origin[Math.floor(Math.random() * origin.length)];
  }
  return result;
};

const enCodeEmail = (email, token) => {
  const content = `${email} ${token}`;
  const cipher = crypto.createCipher("aes192", secretkey); //使用aes192加密
  let enc = cipher.update(content, "utf8", "hex"); //编码方式从utf-8转为hex;
  return enc+cipher.final("hex"); //编码方式转为hex;
};

const deCodeEmail = content => {
 try {
    var decipher = crypto.createDecipher("aes192", secretkey);
    let dec = decipher.update(content, "hex", "utf8");
    return dec + decipher.final("utf8");
 } catch (error) {
   throw new ErrorException('token错误', 413);
 };
};

module.exports = {
  createJwtToken,
  parseJwtToken,
  emaliHelper: new EmailHelper(),
  geneateVerifyCode,
  deCodeEmail,
  enCodeEmail
};
