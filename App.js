const express = require("express");
const ConnectDB = require("./src/config/database");

const app = express();

const User = require("./src/models/user");

app.use(express.json());

app.post("/user", async(req,res)=>{

    const user = new User(req.body);
    try{
         await user.save();
         res.send("User Added Successfully");
    }catch(err){
        res.status(400).send("Error saving the User"+err.message);
    }
})

ConnectDB().then(()=>{
    console.log("DB connection established!!");
})
.catch(()=>{
    console.log("Conection failed")
})

app.listen(7777,()=>{
    console.log("server run on 7777 port");
})

