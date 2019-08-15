const Sequelize = require("sequelize");
const { resolve } = require("path");

const sequelize = new Sequelize("db", null, null, {
  dialect: "sqlite",
  storage: resolve(__dirname, "../../storage/db.sqlite3")
});

module.exports = sequelize;