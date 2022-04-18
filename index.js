const express = require("express");
const unless = require("express-unless");
const routes = require("./index-routes");
const auth = require("./middlewares/auth");
const errors = require("./middlewares/errors");
const { Sequelize } = require("sequelize");
const app = express();
const port = 3000;

auth.authenticateToken.unless = unless;
app.use(
  auth.authenticateToken.unless({
    path: [
      { url: "/api/users/login", methods: ["POST"] },
      { url: "/api/users/register", methods: ["POST"] },
      //   { url: "/", methods: ["GET"] },
    ],
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

app.use("/api", routes);
app.use(errors.errorHandler);
app.listen(port, () => console.log(`app listening on port ${port}`));
