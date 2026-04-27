const express = require("express");

const app = express();

app.use(express.json());

const notes = [];

app.post("/notes", (req, res) => {
  res.send("Notes craeetd");
  notes.push(req.body);
  console.log(req.body);
});

app.get("/notes", (req, res) => {
  res.send(notes);
});

app.get("/about", (req, res) => {yield
  res.send("This is about page");
});

app.listen(3000, () => {
  console.log("This server is running on port 3000");
});
