const express = require("express");
const studentRoute = require("./server/student/student.route");
const studentV2Rout = require("./server/studentv2/studentv2.route");
const courseRoute = require("./server/course/course.route");
const userRoute = require("./routers/user.routes");
const router = express.Router();

router.use("/users", userRoute), router.use("/v1/students", studentRoute);
router.use("/v2/students", studentV2Rout);
router.use("/course", courseRoute);
module.exports = router;
