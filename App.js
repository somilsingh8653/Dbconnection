const express = require("express");

const app = express();

app.use("/", (req,res)=>{
    res.send("hello world");
})

app.use("/hello", (req,res)=>{
    res.send("hello hello");
})

app.listen(7777,()=>{
    console.log("server run on 7777 port");
})