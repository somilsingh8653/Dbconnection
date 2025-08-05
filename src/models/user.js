var validator = require('validator');
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:4,
        maxlength:50,
    },
    lastName : {
        type : String,
        required:true,
    },
    emailId :{
        type : String,
        required:true,
        uniqe:true,
        trim:true,
        lowercase:true,
        validator(value){
            if(! validator.isEmail(value)){
                throw new Error("Invalid email address: "+ value);
            }
        }
    },
    password : {
        type : String,
        required:true,
    },
    age : {
        type: Number,
        min:18,
    },
    gender :{
        type : String,
        validator(value){
            if(!["male" || "female" || "others"].includes(value)){
                throw new Error("Gender data not valid");
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fdefault-profile-picture&psig=AOvVaw0GkakBY5mkekvPwy_IyMTH&ust=1754201876974000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMDp_LC9644DFQAAAAAdAAAAABAU",
    },
    About:{
      type:String,
      default:"This is a default about of the user!!",
    },
    Skill:{
     type:[String],
     
    }
   },
   { 
    timestamps: true 
})

module.exports = mongoose.model("user", UserSchema);