const bcryptjs = require("bcryptjs");
const Joi = require("joi");
const candidateService = require("../services/candidate.services");
const { candidateDataValidate } = require("../validation/candidate.validation");
exports.addCandidate = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({
      message: "Invalid request",
      data: req.body,
    });
  } else {
    const { error } = candidateDataValidate(req.body);

    if (error) {
      res.status(400).json({
        message: "Invalid request",
        error: error.details[0].message,
      });
    } else {
      const result = await candidateService.newCandidate(req);
      if (result) {
        return res.status(201).send({
          message: "Candidate created successfully",
          account: {
            Candidate: result.Candidate,
          },
        });
      } else {
        res.status(409).json({
          message: "Invalid request",
          email: req.body.email,
        });
      }
    }
  }
};

exports.updateCandidate = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({
      message: "Invalid request",
      data: req.body,
    });
  } else {
    const { error } = candidateDataValidate(req.body);

    if (error) {
      res.status(400).json({
        message: "Invalid request",
        error: error.details[0].message,
      });
    } else {
      const result = await candidateService.updateCandidate(req);
      if (result) {
        return res.status(200).send({
          message: "Candidate updated successfully",
          account: {
            Candidate: result.Candidate,
          },
        });
      } else {
        res.status(409).json({
          message: "Invalid request",
          email: req.body.email,
        });
      }
    }
  }
};

exports.getSpecificCandidate = async (req, res, next) => {
  const result = await candidateService.getSpecificCandidate(req);
  return res.status(200).send({
    result: {
      Candidates: result.Candidates,
    },
  });
};

exports.getAllCandidates = async (req, res, next) => {
  const result = await candidateService.getAllCandidates(req);
  return res.status(200).send({
    result: {
      Candidates: result.Candidates,
    },
  });
};
exports.deleteCandidate = async (req, res, next) => {
  const result = await candidateService.deleteCandidate(req);
  if (result)
    return res.status(200).send({
      Message: "Candidate deleted successfully",
    });
  else
    return res.status(200).send({
      Message: "Candidate deleted successfully",
    });
};
exports.getCandidateCount = async (req, res, next) => {
  const result = await candidateService.getCandidateCount(req);
  return res.status(200).send({
    TotalCount: result,
  });
};
