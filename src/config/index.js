const env = process.env;
module.exports = {
  port: env.PORT || 3000,

  jwtConfig: {
    secret: "todo-app",
    expiresIn: "12h"
  }
};
