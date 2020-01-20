const express = require("express");
const app = express();
app.use(express.json());
const routes = require("./routes");

app.use("/", (req, res, next) => {
  console.log({ baseURL: req.baseUrl, path: req.path });
  next();
});

app.use("/api", routes);

module.exports = app;
