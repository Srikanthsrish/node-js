const express = require("express");
const app = express();
const connection=require("../mysqlconnections/connect.js")
const port = 3003;
app.get("/product", (req, res) => {
    connection.query("select * from employees",(err,data)=>{
        if(err){
            res.send({
                status:400,
                message:err.message
            })
        }else{
            res.send({
                status:200,
                data:data
            })
        }
})
});
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
})