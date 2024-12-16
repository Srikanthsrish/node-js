const express = require("express");
const app = express();
const connection = require("../mysqlconnections/connect.js")
const port = 3003;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.post("/register", (req, res) => {
    const { stu_id, stu_name, stu_study } = req.body;
    const sqlQuery = "INSERT INTO college (stu_id, stu_name, stu_study) VALUES (?, ?, ?)";
    const values = [stu_id, stu_name, stu_study];
    connection.query(sqlQuery, values, (err, data) => {
        if (err) {
            res.send({
                status: 400,
                message: err.message
            })
        }
        res.status(200).send({
            status: 200,
            data: data,
            message: "User registered successfully."
        });
    })
});
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
})