module.exports = (sequelize, DataTypes) => {



    const client = sequelize.define("user", {
        fname: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return client
}