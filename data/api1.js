var express=require("express");
var app=express();
var port=3009;
app.get("/",(req,res)=>{
    res.send("hi")
})
app.listen(port,()=>{
    console.log("server has been strated")
})