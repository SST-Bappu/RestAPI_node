const pool = require('../../config/db');
const queries = require('./student.queries');

const getStudents = (req, res) => {
    pool.query(queries.getStudents, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    });
}
const getStudentsById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentsById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    })
}
const addStudent = (req, res) => {
    const {
        name,
        email,
        age,
        dob
    } = req.body;

    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if (results.rows.length) {
            res.status(409).send("Email already exists")
        }
        pool.query(queries.addStudent, [name, email, age, dob], (error, results) => {
            if (error) throw error;
            res.status(201).send("Student Created Successfully")
        })
    })
}

const deleteStudent = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.checkStudent, [id], (error, results) => {
        if (!(results.rows.length)) {
            res.status(404).send("No such student exists")
        }
        pool.query(queries.deleteStudent, [id], (error, results) => {
            if (error) throw error;
            res.status(200).send("Student has been deleted successfully")
        })
    })

}
const updateStudent = (req, res) => {
    const id = parseInt(req.params.id)
    const {
        name,
        email,
        age,
        dob
    } = req.body;
    pool.query(queries.checkStudent, [id], (error, results) => {
        if (!(results.rows.length)) {
            res.status(404).send("No such student exists")
        }
        pool.query(queries.updateStudent, [name, email, age, dob, id], (error, results) => {
            if (error) throw error;
            res.status(200).send("A student has been updated successfully");
        })
    })
}
module.exports = {
    getStudents,
    getStudentsById,
    addStudent,
    deleteStudent,
    updateStudent
};