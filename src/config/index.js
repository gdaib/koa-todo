const env = process.env;
module.exports = {
  port: env.PORT || 3000,
  secret: 'todo-app'
};
