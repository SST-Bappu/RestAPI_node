const addCandidate = "CALL add_candidate($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)";
const getCandidateByID = "SELECT * FROM getcandidatebyid($1)";
const getCandidateByEmail = "SELECT * FROM getcandidatebyemail($1)";
const updateCandidate =
  "CALL update_candidate($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)";
const getAllCandidates = "SELECT * FROM getallcandidates()";
const deleteCandidate = "CALL delete_candidate($1)";
const candidateCount = "SELECT * FROM getcandidatecount()";

module.exports = {
  addCandidate,
  getCandidateByID,
  getCandidateByEmail,
  updateCandidate,
  getAllCandidates,
  deleteCandidate,
  candidateCount,
};
