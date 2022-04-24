const candidateController = require("../controllers/candidate.controller");

const express = require("express");
const router = express.Router();

router.post("/", candidateController.addCandidate);
router.put("/:id", candidateController.updateCandidate);
router.get("/", candidateController.getAllCandidates);
router.get("/:id", candidateController.getSpecificCandidate);
router.delete("/:id", candidateController.deleteCandidate);

router.get("/count", candidateController.getCandidateCount);
// router.post("/login", userController.login);
// router.get("/user-profile", userController.userProfile);

module.exports = router;
