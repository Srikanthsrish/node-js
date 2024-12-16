const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3003;
// Multer storage configuration with folder creation
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "image");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir); // Automatically create the directory if it doesn't exist
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Add timestamp to filename
  },
});
const upload = multer({ storage: storage });
// Route to handle file upload
app.post("/data", upload.single("profilepic"), (req, res) => {
  

  res.send({
    statusCode: 200,
    message: "File successfully uploaded and data stored",
    userData: obj,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});


