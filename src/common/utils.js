const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config");
const EmailHelper = require("./EmaliHelper");

// 生成 jwt token
const createJwtToken = data =>
  jwt.sign(data, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });

// 解析  token
const parseJwtToken = token => jwt.verify(token, jwtConfig.secret);

// type mixin number char
const geneateVerifyCode = (len) => {
  const origin =
    '01234567890abcdefghijklmnopqrstuvwsyzABCDEFGHIJKLMNOPQRSTUVWSYZ'
  let result = ''
  for (let i = 0; i < len; i++) {
    result += origin[Math.floor(Math.random() * origin.length)]
  }
  return result
}

module.exports = {
  createJwtToken,
  parseJwtToken,
  emaliHelper: new EmailHelper(),
  geneateVerifyCode
};
