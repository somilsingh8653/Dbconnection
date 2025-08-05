const express = require("express");
const ConnectDB = require("./src/config/database");
const {validateSignUpDate}=require("./src/utils/validation");
const bcrypt = require('bcrypt');
const User = require("./src/models/user");

const app = express();



app.use(express.json());

//Signup

app.post("/signup", async(req,res)=>{
    try{

        //validation of data
        validateSignUpDate(req);

        const { firstName,lastName,emailId,password }=req.body;

        //encrypt the password
        const passwordhash =  await bcrypt.hash(password,10);
        console.log(passwordhash);

        //create a new instance of the model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password:passwordhash,
        });

        await user.save();
        res.send("User is added Successfully");

    }catch(err){
       res.status(400).send("ERROR: "+err.message);
    }
})

//login

app.post("/login", async(req,res)=>{

    try{
        const {emailId,password}=req.body;
    
    //email find in database
    const user = await User.findOne({emailId:emailId});

    if(!user){
        throw new Error("Email id is not found!!");
    }
    //password find in databse
    const isPasswordvalid = await bcrypt.compare(password,user.password);

    if(isPasswordvalid){
        res.send("Login successfull!!");
    }
    else{
        throw new Error("Password is invalid!!");
    }
    }catch(err){
        res.status(400).send("ERROR"+err.message);
    }
  

})

//profile



ConnectDB()
.then(()=>{
    console.log("DB connection established!!");
})
.catch(()=>{
    console.log("Conection failed")
})

app.listen(7777,()=>{
    console.log("server run on 7777 port");
})

