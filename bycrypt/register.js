const express = require('express');
const app = express();
const bcrypt = require("bcrypt");
const fs = require("fs");
const port = 3008;
app.use(express.json());
app.get('/', (req, res) => {
  res.send("Welcome to the home page");
});
// Register route (POST request)
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send({ error: "Username and Password are required" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user data object
    const data = {
      username: username,
      password: hashedPassword
    };

    // Write the data to a file (index.json)
    fs.writeFile("index.json", JSON.stringify(data), "utf-8", (err) => {
      if (err) {
        return res.status(500).send({ error: "Error saving data to file" });
      }
      
      res.status(200).send({
        status: 200,
        message: "User registered successfully",
        data: {
          username: username,
          password: hashedPassword
        }
      });
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ error: "Internal server error" });
  }
});

// Login route (POST request)
app.post("/login", async (req, res) => {
  try {
    // Read the user details from the file
    const registerdetails = fs.readFileSync("./index.json", "utf-8");

    // Parse the JSON file and extract the hashed password
    const data = JSON.parse(registerdetails);
    const { username: storedUsername, password: hashedPassword } = data;


    // Get the password from the request body
    const { username: userUsername, password: userPass } = req.body;

    if (!userUsername || !userPass) {
        return res.status(400).send({ error: "Username and Password are required" });
      }
    if (userUsername !== storedUsername) {
        return res.status(401).send({ message: "Invalid username" });
      }

    // Compare the input password with the hashed password
    const match = await bcrypt.compare(userPass, hashedPassword);

    // Send the result as a JSON response
    if (match) {
        res.send({ message: "Login successful", match: true });
      } else {
        res.status(401).send({ message: "Invalid password", match: false });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send({ error: "Internal server error" });
    }
});
app.listen(port, () => {
  console.log("Server has been started.. http://localhost:" + port);
});
