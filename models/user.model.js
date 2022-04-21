module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define("user", {
    fname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uname: {
      type: DataTypes.STRING,
      allowNullL: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNullL: false,
    },
    contactno: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_hr: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    // Foreign key to client table for the hrs
    clientId: {
      type: DataTypes.INTEGER,
    },
  });
  return user;
};
