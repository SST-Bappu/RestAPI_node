module.exports = (sequelize, DataTypes) => {



    const student = sequelize.define("n_student", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNullL: false
        },
        age: {
            type: DataTypes.INTEGER
        }
    })
    return student
}