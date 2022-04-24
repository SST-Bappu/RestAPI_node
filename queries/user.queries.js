const getUserByEmail = "SELECT * FROM getuserbyusername($1)";
const registerUser = "CALL register_user($1,$2,$3,$4,$5,$6,$7,$8)";

module.exports = {
  getUserByEmail,
  registerUser,
};
