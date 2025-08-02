const express = require("express");
const ConnectDB = require("./src/config/database");

const app = express();

const User = require("./src/models/user");

app.use(express.json());


//feed Api

app.get("/feed" , async(req,res)=>{

    try{
     const user = await User.find({});
     res.send(user);
    }catch(err){
     res.status(400).send("Something went wrong");
    }
});


//get the data
app.get("/user", async(req , res)=>{

    const userEmail = req.body.emailId;

    try{
        
        const users = await User.find({emailId:userEmail});
        if(users.length === 0){
            res.status(400).send("user not found")
        }else{
            res.send(users);
        }
    }catch(err){
         res.status(400).send("Error saving the User"+err.message);
     }
})


//Post the data into database

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

