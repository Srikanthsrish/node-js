const express = require("express");
const app = express();
const cors=require('cors')
const connection = require("../mysqlconnections/connect");
const port = 3003;
app.use(cors());
app.get("/users", (req, res) => {
    const limit = 5; // Number of records per page
    const page = parseInt(req.query.page) || 1; // Default page 1
    const offset = (page - 1) * limit;

    // Count total records
    const countQuery = "SELECT COUNT(*) AS total FROM users";
    connection.query(countQuery, (err, countResult) => {
        if (err) return res.status(500).send({ error: err.message });

        const totalRecords = countResult[0].total;
        const totalPages = Math.ceil(totalRecords / limit);

        // Fetch paginated records
        const dataQuery = `SELECT * FROM users LIMIT ${limit} OFFSET ${offset}`;
        connection.query(dataQuery, (err, dataResult) => {
            if (err) return res.status(500).send({ error: err.message });

            res.json({
                data: dataResult,
                currentPage: page,
                totalPages: totalPages,
                hasPrevPage: page > 1,
                hasNextPage: page < totalPages,
            });
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
