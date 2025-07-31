const mongoose = require("mongoose")

const connectDB = async()=>{

    await mongoose.connect(
        "mongodb+srv://somilsingh8653:CC2DmlOJs8Adml1C@cluster0.0wgwfwx.mongodb.net/DatabaseC");
};

module.exports=connectDB;