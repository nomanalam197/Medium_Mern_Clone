const mongoose = require("mongoose");

// use to make use of env file due to dotenv added in server.js app. js means in express generator
// require("dotenv").config({path: "./.env"})

// in new version of mongoose it is written
mongoose.set("strictQuery", true);

exports.databaseConnection = async ()=>{
    try{
        // await mongoose.connect("mongodb://127.0.0.1:27017/r8")
        // mongodb+srv://noman123:<password>@cluster0.dwnybhf.mongodb.net/?retryWrites=true&w=majority
        await mongoose.connect("mongodb+srv://noman123:noman123@cluster0.dwnybhf.mongodb.net/medium-r8?retryWrites=true&w=majority")

        console.log("databse Connected!!")
    }
    catch(err){
        console.log(err.message);
    }
}

