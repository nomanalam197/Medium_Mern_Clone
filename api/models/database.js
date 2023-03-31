const mongoose = require("mongoose");

// use to make use of env file due to dotenv added in server.js app. js means in express generator
// require("dotenv").config({path: "./.env"})

// in new version of mongoose it is written
mongoose.set("strictQuery", true);

exports.databaseConnection = async ()=>{
    try{



        await mongoose.connect("Mongodb_uri_link")

        console.log("databse Connected!!")
    }
    catch(err){
        console.log(err.message);
    }
}

