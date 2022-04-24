const { required } = require("nodemon/lib/config");
const pool = require("../config/db");
const auth = require("../middlewares/auth");
const Query = require("../queries/candidate.queries");

const newCandidate = async (req, res, callback) => {
  const data = {
    fname: req.body.fname,
    uname: req.body.uname,
    username: req.body.email,
    password: req.body.password,
    contactno: req.body.contactno,
    is_admin: req.body.is_admin,
    is_hr: req.body.is_hr,
    clientId: req.body.clientId,
  };
  await pool.query(Query.addCandidate, [
    req.body.fname,
    req.body.pre_emp,
    req.body.cur_job,
    req.body.cur_ctc,
    req.body.exp_ctc,
    req.body.notice_period,
    req.body.photo,
    req.body.resume,
    req.body.contactno,
    req.body.email,
  ]);
  const user = await pool.query(Query.getCandidateByEmail, [req.body.email]);
  return { Candidate: user.rows[0] };
};

const updateCandidate = async (req, res, callback) => {
  const data = {
    fname: req.body.fname,
    uname: req.body.uname,
    username: req.body.email,
    password: req.body.password,
    contactno: req.body.contactno,
    is_admin: req.body.is_admin,
    is_hr: req.body.is_hr,
    clientId: req.body.clientId,
  };
  await pool.query(Query.updateCandidate, [
    req.body.fname,
    req.body.pre_emp,
    req.body.cur_job,
    req.body.cur_ctc,
    req.body.exp_ctc,
    req.body.notice_period,
    req.body.photo,
    req.body.resume,
    req.body.contactno,
    req.body.email,
    req.params.id,
  ]);
  const candidate = await pool.query(Query.getCandidateByID, [req.params.id]);
  return { Candidate: candidate.rows[0] };
};
const getSpecificCandidate = async (req, res, callback) => {
  const candidates = await pool.query(Query.getCandidateByID, [req.params.id]);
  return { Candidates: candidates.rows[0] };
};

const getAllCandidates = async (req, res, callback) => {
  const candidates = await pool.query(Query.getAllCandidates);
  return { Candidates: candidates.rows };
};
const deleteCandidate = async (req, res, callback) => {
  const result = await pool.query(Query.deleteCandidate, [req.params.id]);
  if (result) {
    return true;
  } else return false;
};

const getCandidateCount = async (req, res, callback) => {
  const candidates = await pool.query(Query.candidateCount);
  return { Candidates: candidates.rows };
};
module.exports = {
  newCandidate,
  updateCandidate,
  getSpecificCandidate,
  getAllCandidates,
  deleteCandidate,
  getCandidateCount,
};
