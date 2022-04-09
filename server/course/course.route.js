const {
    Router
} = require('express');
const controller = require('./course.controller');
const router = Router();

router.post("/", controller.addCourse);
module.exports = router;