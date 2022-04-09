const {
    MetadataWithSuchNameAlreadyExistsError
} = require('typeorm')

db = require('../../config/db-config')


const Student = db.students
const Course = db.courses


// create student
const addStudent = async (req, res) => {
    try {
        const dupStudent = await Student.findOne({

            where: {
                email: req.body.email
            }
        })
        if (dupStudent) {
            res.status(409).send("A student already exists with this email")
        }
        let data = {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        }
        const student = await Student.create(data)
        let course = await Course.findOne({
            where: {
                id: req.body.course
            }
        })
        console.log("Course is here......")
        console.log(course)
        await student.addCourse(course);
        res.status(201).send(student)
    } catch (err) {
        res.status(400).send(err)
    }

}

//get all students

const getAllStudents = async (req, res) => {
    try {
        let students = await Student.findAll({
            include: [Course]
        })
        res.status(200).send(students)
    } catch (err) {
        res.status(404).send("Not Found")
    }
}

// get student by id

const getStudentById = async (req, res) => {
    let id = req.params.id
    let student = await Student.findOne({

        where: {
            id: id
        }
    })
    res.status(200).send(student)
}

// update student

const updateStudent = async (req, res) => {
    let id = req.params.id
    let studen = await Student.update(req.body, {
        where: {
            id: id
        }
    })
    let student = await Student.findOne({

        where: {
            id: id
        }
    })
    res.status(200).send(student)
}

// delete student by id

const deleteStudent = async (req, res) => {
    let id = req.params.id
    await Student.destroy({
        where: {
            id: id
        }
    })
    res.status(200).send("Student has been deleted successfully")
}

module.exports = {

    addStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
}