const express = require("express");
const LocalStorage  = require('node-localstorage');
const app = express();
const port = 3003;
const localStorage = new LocalStorage('./scratch');
localStorage.setItem('username', 'Srikanth');
app.get("/data", (req, res) => {
  const username = localStorage.getItem('username');
  res.send(username)
});
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
