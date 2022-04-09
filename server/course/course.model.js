module.exports = (sequelize, DataTypes) => {


    const course = sequelize.define('course', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        code: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return course
}