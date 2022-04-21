const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);
  jwt.verify(token, "secretKey_cmt_sst_bappu", (err, user) => {
    if (err) return res.status(403).send("Invalid Token");
    req.user = user;
    next();
  });
}

function generateAccessToken(username) {
  return jwt.sign({ data: username }, "secretKey_cmt_sst_bappu", {
    expiresIn: "1h",
  });
}

module.exports = {
  authenticateToken,
  generateAccessToken,
};
