const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());


app.use(express.static("public"));


app.get("/api/hero", (req, res) => {
  fs.readFile("./hero.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("Error loading hero data");
    } else {
      res.send(JSON.parse(data));
    }
  });
});


app.get("/api/menu", (req, res) => {
  fs.readFile("./menu.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("Error loading menu data");
    } else {
      res.send(JSON.parse(data));
    }
  });
});


app.get("/api/footer", (req, res) => {
  fs.readFile("./footer.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).send("Error loading footer data");
    } else {
      res.send(JSON.parse(data));
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
