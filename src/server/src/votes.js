const express = require("express");
const router = express.Router();
const { createResponse } = require("./utils");

const responseMapper = vote => (vote ? "yes" : "no");

let poll = { yes: 0, no: 0 };

router.get("/", (req, res) => res.json(createResponse(poll)));

router.post("/", (req, res) => {
  const result = {
    vote: responseMapper(req.body.vote),
    created: Date.now().toString()
  };
  result.vote === "yes" ? poll.yes++ : poll.no++;
  return res.json(createResponse(result));
});

router.delete("/", (req, res) => {
  poll = { yes: 0, no: 0 };
  return res.json(createResponse(poll));
});

module.exports = router;
