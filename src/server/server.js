const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

let poll = { yes: 0, no: 0 };

const responseMapper = vote => (vote ? "yes" : "no");

const createResponse = (data, message) => {
  if (message) {
    return {
      data,
      error: true,
      message
    };
  }
  return { data };
};

app.get("/vote", (req, res) => res.json(createResponse(poll)));

app.post("/vote", (req, res) => {
  const result = {
    vote: responseMapper(req.body.vote),
    created: Date.now().toString()
  };
  result.vote === "yes" ? poll.yes++ : poll.no++;
  return res.json(createResponse(result));
});

app.delete("/vote", (req, res) => {
  poll = { yes: 0, no: 0 };
  return res.json(createResponse(poll));
});

app.get("/health", (req, res) => res.json({ status: "UP" }));

app.use((req, res) => {
  console.log({ baseURL: req.baseUrl, path: req.path });
  return res.sendStatus(404);
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
