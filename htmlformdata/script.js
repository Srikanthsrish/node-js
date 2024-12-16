const express=require('express');
const app=express();
const port=3002;
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.get("/",(req,res)=>{
res.send("welcome to home page...") 
})
app.post("/data",(req,res)=>{
    res.send({
        "message":"successfully sent data",
        data:req.body

    } )
    })
app.listen(port,()=>{
    console.log("server started at "+"http://localhost:"+port)
})