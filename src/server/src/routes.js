const express = require("express");
const router = express.Router();
const votes = require("./votes");

router.get("/", function(req, res) {
  res.json({ message: "Hello" });
});

router.get("/health", (req, res) => res.json({ status: "UP" }));

router.use("/votes", votes);

module.exports = router;
