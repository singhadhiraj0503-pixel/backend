const express = require("express");

const app = express();

app.use(express.json());

const notes = [];

app.get("/", (req, res) => {
  res.send("Hello World !");
});

app.post("/notes", (req, res) => {
  console.log(req.body);
  notes.push(req.body);
  res.send("note created");
});

app.get("/notes", (req, res) => {
  res.send(notes);
});

app.delete("/notes/:id", (req, res) => {
  delete notes[req.params.id];
  res.send("Note Deleted Successfully");
});

app.patch("/notes/:id", (req, res) => {
  notes[req.params.id].description = req.body.description;
  res.send("Modified Successfully");
});

module.exports = app;
