// Import necessary modules
const express = require("express");
const app = express();
const fs = require("fs");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const path = require("path");
const multer = require("multer");
const otp = require("../otp/otp.js"); // Module for generating OTPs
const connection = require("../mysqlconnections/connect.js"); // MySQL connection setup

const port = 3003; // Port for the server
// Middleware to parse request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Nodemailer transporter configuration
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'srishbontha83@gmail.com',
    pass: 'einn ibzd imft qbmd' // App-specific password (replace with secure storage in production)
  }
});

// Multer storage configuration for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "image"); // Directory for uploaded files
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir); // Create directory if it doesn't exist
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename with timestamp
  },
});

const upload = multer({ storage: storage }); // Multer instance

// Route for user registration
app.post("/register", upload.single("profilepic"), async (req, res) => {
  try {
    // Destructure request body
    const { username, password, email, confirmpassword } = req.body;
    const profilepic = req.file.path;
    const emailotp = otp(4);

    // Validate required fields
    if (!username || !password || !confirmpassword || !email || !profilepic) {
      return res.status(400).send({ error: "Username, Password, confirmpassword, Email, profile are required." });
    }

    // SQL query to check if table exists
    const sqlcreate = "CREATE TABLE IF NOT EXISTS register(username VARCHAR(25), password VARCHAR(255), email VARCHAR(34), emailotp INT(20), profilepic VARCHAR(255));";

    // Ensure table exists
    connection.query(sqlcreate, (err) => {
      if (err) {
        console.error("Error creating table:", err.message);
        return res.status(500).send({ error: "Error creating table" });
      }
      console.log("Table 'register' ensured in database.");
    });

    // SQL query for checking if the username exists
    const usernameChecking = "SELECT * FROM register WHERE username = ?;";
    connection.query(usernameChecking, [username], async (err, rows) => {
      if (err) {
        console.error("Error querying table:", err.message);
        return res.status(500).send({ error: "Error querying database" });
      }

      // Check if the username already exists
      if (rows.length > 0) {
        return res.status(400).send({ message: "Username already exists." });
      }

      // Hash password using bcrypt
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Compare passwords to confirm match
      const match = password === confirmpassword;

      if (!match) {
        return res.status(400).send({ message: "Passwords do not match" });
      }

      // Send OTP email
      const mailOptions = {
        from: 'srishbontha83@gmail.com',
        to: email, // Send to user's email
        subject: 'Registration Successful',
        text: `Your OTP is: ${emailotp}` // Generate a 4-digit OTP
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      const allowedExtensions = [".png", ".jpeg", ".jpg", ".gif"];
      const profilepic= req.file.path;
      const fileExtension = path.extname(profilepic).toLowerCase(); // Ensure case-insensitive matching
      
        // Validate file extension
        if (!allowedExtensions.includes(fileExtension)) {
          return res.status(400).send("Only .png, .jpeg, .jpg, .gif file extensions are accepted.");
        }


      // SQL query to insert user data
      const sqlInsertion = "INSERT INTO register (username, password, email, emailotp, profilepic) VALUES (?, ?, ?, ?, ?);";
      const values = [username, hashedPassword, email, emailotp, profilepic];

      // Insert user data into the database
      connection.query(sqlInsertion, values, (err, data) => {
        if (err) {
          console.error("Error inserting data:", err.message);
          return res.status(500).send({ error: "Error inserting data into the database" });
        }

        // Successful registration response
        res.status(200).send({
          status: 200,
          data: data,
          message: "User registered successfully."
        });
      });
    });
  } catch (error) {
    console.error("Error processing registration:", error.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
});
app.post("/login", (req, res) => {
  const { name, userpassword } = req.body;

  if (!name || !userpassword) {
    return res.status(400).send({ error: "Username and password are required." });
  }

  // Query to find user by username
  const query = "SELECT * FROM register WHERE username = ?";
  connection.query(query, [name], async (err, results) => {
    if (err) {
      console.error("Error querying the database:", err.message);
      return res.status(500).send({ error: "Database query failed." });
    }

    if (results.length === 0) {
      // No user found with the provided username
      return res.status(401).send({ error: "Invalid username or password." });
    }

    const user = results[0]; // First user from the query results
    const storedHashedPassword = user.password; // Stored hashed password in the database

    // Compare provided password with stored hashed password
    const isPasswordMatch = await bcrypt.compare(userpassword, storedHashedPassword);

    if (!isPasswordMatch) {
      // Passwords do not match
      return res.status(401).send({ error: "Invalid username or password." });
    }

    // Successful login
    res.status(200).send({
      status: 200,
      message: "Login successful.",
      user: { id: user.id, username: user.username }, // Avoid sending sensitive details like passwords
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

