const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("AnyFeast backend is running");
});

app.get("/api/countries", (req, res) => {
  res.json(["India", "United Kingdom"]);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});