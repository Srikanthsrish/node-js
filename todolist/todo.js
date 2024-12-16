var express = require("express");
var app = express();
const connection = require("../mysqlconnections/connect.js");
var port = 3009;
const cors = require("cors");

// Middleware to parse JSON body
app.use(express.json());
app.use(cors());
app.post("/lists", (req, res) => {
    console.log("Request Body:", req.body);
  });
  

app.post("/listadd", (req, res) => {
  const { listdata } = req.body; // Extracting data from request body

  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS todolist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    listdata VARCHAR(1000)
  );
`;


  // Step 1: Ensure the table exists
  connection.query(createTableQuery, (err) => {
    if (err) {
      console.error("Error creating table:", err.message);
      return res.status(500).send({ error: "Error creating table" });
    }

    console.log("Table 'todolist' ensured in the database.");

    // Step 2: Insert data into the table
    const insertDataQuery = "INSERT INTO todolist (listdata) VALUES (?);";

    connection.query(insertDataQuery, [listdata], (err, result) => {
      if (err) {
        console.error("Error inserting data:", err.message);
        return res.status(500).send({ error: "Error inserting data into the database" });
      }

      res.status(200).send({
        status: 200,
        message: "Data inserted successfully.",
        result: result,
      });
    });
  });
});

app.get("/data",(req,res)=>{
    const getdata="select * from todolist;"
    connection.query(getdata,(err, result) => {
        if (err) {
          console.error("Error inserting data:", err.message);
          return res.status(500).send({ error: "Error inserting data into the database" });
        }else{
            res.send(result)
        }
    })
})
app.delete("/listdelete", (req, res) => {
  const { id } = req.body;  // Extract the id from the request body

  if (!id) {
    return res.status(400).send({ error: "ID is required" });
  }

  const deleteQuery = "DELETE FROM todolist WHERE id = ?";

  connection.query(deleteQuery, [id], (err, result) => {
    if (err) {
      console.error("Error deleting item:", err.message);
      return res.status(500).send({ error: "Error deleting item from the database" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).send({ error: "No item found with the given ID" });
    }

    res.status(200).send("Successfully deleted");
  });
});

app.put("/listedit", (req, res) => {
  const { currentData, newData } = req.body;  // Extract the currentData and newData from the request body

  if (!currentData || !newData) {
    return res.status(400).send({ error: "Both currentData and newData are required" });
  }

  // Define the update query: update where listdata matches currentData
  const updateQuery = "UPDATE todolist SET listdata = ? WHERE listdata = ?;";

  connection.query(updateQuery, [newData, currentData], (err, result) => {
    if (err) {
      console.error("Error updating data:", err.message);
      return res.status(500).send({ error: "Error updating data in the database" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).send({ error: "No item found with the given listdata" });
    }

    res.status(200).send({
      status: 200,
      message: "Data updated successfully.",
      result: result,
    });
  });
});
app.listen(port, () => {
  console.log("Server has been started on port:", port);
});


