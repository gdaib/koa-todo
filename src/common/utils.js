const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config");
const EmailHelper = require("./EmaliHelper");

// 生成 jwt token
const createJwtToken = data =>
  jwt.sign(data, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });

// 解析  token
const parseJwtToken = token => jwt.verify(token, jwtConfig.secret);


module.exports = {
  createJwtToken,
  parseJwtToken,
  emaliHelper: new EmailHelper()
};
