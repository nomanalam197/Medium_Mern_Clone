const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcrypt");

// this toke for jwt web token
const jwt = require("jsonwebtoken")

const userModel = new mongoose.Schema(
    {
        name: {
            type: String,
            minLength: [4, "name must have atleast 4 characters."],
            required: [true, "name is required"],
        },
        username: {
            type: String,
            unique: true,
            minLength: [4, "username must have atleast 4 characters"],
        },
        email: {
            type: String,
            require: [true, "email is required."],
            validate: [validator.isEmail, "email is invalid."]
        },
        password: {
            // this select false makes able that whenever somebody send schema from one route to another 
            // password will not go with it until it selects it
            select: false,
            type: String,
            minLength: [6, "must have atleast 6 characters."],
            required: [true, "must have password field."],
            match: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
        },
        bio: {
            type: String,
            maxLength: [69, "bio must have atmost 69 characters"]
        },
        about: {
            type: String,
            maxLength: [143, "about must have have atmost 143 characters"]
        },
        avatar: {
            type: Object,
            default: {
                public_id: "1",
                url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHByb2ZpbGUlMjBwaWMlMjBhbmltZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            }
        },
        lists: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "blog"
        }],
        stories: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "blog"
        }],
        passwordResetToken: 0
    },
    { timestamps: true }
);


// below code is not valid as fat arrow function is now allowed
// userModel.pre("save",async ()=>{
//     this.password = await bcrypt.hash(this.password, 10);
// })

// for only hashing

// userModel.pre("save", async function () {
//     this.password = await bcrypt.hash(this.password, 10);
// });


// with hashing and salting
// here we had used if condition just because from isLoggedin we do send password
// as we do not want to make the password again hashing and salting.
userModel.pre("save", async function () {
    // console.log(this.password);
        if (this.password) {

            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            this.password = await bcrypt.hash(this.password, salt);
        }

        // if (this.password) {
        //     this.password = await bcrypt.hash(this.password, 10);
        // }
    
});

// this.password mein below code mein currently jo schema dhundha gya routing mein usi schema ke function ko call 
// kiya gya
userModel.methods.comparePassword = function (userPassword) {
    return bcrypt.compareSync(userPassword, this.password)
}

// secretOrPrivateKey is the secret key we use to sign the token. 
// here secretkey is SECRETKEYJWT
// it is like ** id for token

// user loggedin hote wkt saara details ek function ke zriye auth file mein bhej diya jaata hai btane ke liye ki
// kon se user ke schema ko access krna hai taaki uske schema gettoken function active kiya jae
//  token bnta hai yha and add kr diya jaata hai schema mein add
// to be more elaborate ** yha se token bnke schema mein add jb auth se 
userModel.methods.gettoken = function () {
    return jwt.sign({ id: this._id }, "SECRETKEYJWT", { expiresIn: "1h" })
    // return jwt.sign({id: this._id}, "SECRETKEYJWT", {expiresIn: "20s"})
}


//  ** it is the other way that we can do the 

// userModel.methods.sendToken = (user, req, res, statuscode)=>{
//     const token = user.gettoken();

//     // to make active at localhost httponly: true,
//     // to make activate at https secure link secure: true,
//     res.cookie("token", token, {
//         expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
//         httponly: true,
//         // secure: true,
//     })


//     // if you are sending response at index routing while calling sendtoken than do not send res here below response
//     // is just for verificatioon

//     //either send response from here of return so that we are able to send response from indexController
//     // res.json({message: "user logged in", token})
//     return "user logged in";
// }

const user = mongoose.model("user", userModel);

module.exports = user;