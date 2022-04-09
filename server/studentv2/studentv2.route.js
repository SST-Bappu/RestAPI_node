const {
    Router
} = require('express');
const controller = require('./studentv2.controller');
const router = Router();

router.post("/", controller.addStudent);
router.get('/', controller.getAllStudents);
router.get("/:id", controller.getStudentById);
router.put('/:id', controller.updateStudent);
router.delete('/:id', controller.deleteStudent);
module.exports = router;