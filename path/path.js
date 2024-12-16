const express = require('express');
const app = express();
const filename=__filename
const path = require('path');


console.log(path.basename(filename,[".css",".abc",".html"])); // Output: .txt


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
