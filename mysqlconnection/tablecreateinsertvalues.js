const express = require("express");
const app = express();
const connection=require("../mysqlconnections/connect.js")
const port = 3003;
app.use()
app.post("/register", (req, res) => {
    sqltable="create table college(stu_id int(20) ,stu_name varchar(25),stu_study varchar(23));"
    sqlvalues="insert into college values(2,'srikanth','mernstack'),(3,'nikki','fullstack');"
    connection.query(sqltable,(err,data)=>{
        if(err){
            res.send({
                status:400,
                message:err.message
            })
        }
        console.log("successfully created table ")
   
    connection.query(sqlvalues,(err,data)=>{
        if(err){
            res.send({
                status:400,
                message:err.message
            })
        }
        console.log("successfully inserted data")
            res.send({
                status:200,
                data:"successfully created college table and inserted values into students"
            })
        
    })
    
}) 
});
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
})