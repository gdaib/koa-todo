const env = process.env;
module.exports = {
  port: env.PORT || 3000,
  env: env.ENV, // 环境
  jwtConfig: {
    secret: "todo-app",
    expiresIn: "12h"
  }
};
