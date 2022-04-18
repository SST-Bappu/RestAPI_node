const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("cmtdb", "cmtuser", "cmt12345", {
  host: "103.157.135.96",
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Datbase is connected");
  })
  .catch((err) => {
    console.log("Error : ", err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("../models/user.model")(sequelize, DataTypes);
db.clients = require("../models/client.model")(sequelize, DataTypes);

async function dbsync(db) {
  await db.sequelize
    .sync({
      force: false,
    })
    .then(() => {
      console.log("Database Table created successfully");
    });
}
dbsync(db);
db.clients.hasMany(db.users);
db.users.belongsToMany(db.clients, {
  through: "client_user",
});
module.exports = db;
