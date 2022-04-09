db = require('../../config/db-config')


const Student = db.students
const Course = db.courses


// create student
const addCourse = async (req, res) => {
    let data = {
        title: req.body.title,
        code: req.body.code
    }
    const course = await Course.create(data)
    res.status(201).send(course)

}



module.exports = {

    addCourse
}