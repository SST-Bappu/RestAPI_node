const {
    Sequelize,
    DataTypes
} = require("sequelize");

const sequelize = new Sequelize('student_node', 'postgres', '12345', {
    host: 'localhost',
    dialect: 'postgres'
});


sequelize.authenticate()
    .then(() => {
        console.log('Datbase is connected');
    })
    .catch(err => {
        console.log('Error : ', err)
    })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.students = require('../server/studentv2/studentv2.models')(sequelize, DataTypes)
db.courses = require('../server/course/course.model')(sequelize, DataTypes)

db.sequelize.sync({
        force: false
    })
    .then(() => {
        console.log("Database tables created successfully")
    })

db.students.belongsToMany(db.courses, {
    through: 'student_course'
})
db.courses.belongsToMany(db.students, {
    through: "student_course"
})
module.exports = db