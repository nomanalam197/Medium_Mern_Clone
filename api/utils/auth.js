const jwt = require("jsonwebtoken");
const User = require("../models/userModel")

// yes you are true we can do it in userModel.js itseld by just
// making sendtoken function in userModel.js function like userModel.methods.sendToken 
// and just calling it by indexController.js directly like const cretedtoken = user.sendToken(user, req, res, 200);

exports.sendToken = (user, req, res, statuscode)=>{
    const token = user.gettoken();

    // to make active at localhost httponly: true,
    // to make activate at https secure link secure: true,
    res.cookie("token", token, {
        // expires: new Date(Date.now() + 20*1000),
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        httponly: true,
        // secure: true,
    })


    // if you are sending response at index routing while calling sendtoken than do not send res here below response
    // is just for verificatioon
    // res.json({message: "user logged in", token})

    user.password = undefined;
    res.json({message: "user logged in", user: user})
}

// // middlewere it can be done in file just it had to be imported to indexroute carefully
// exports.isLoggedIn = (req,res,next)=>{
//     try{
//         const token = req.cookies.token;

//         // this checks that the last token present in cookies is similar to the toke of the user logged in

//         // const data = jwt.verify(token,"SECRETKEYJWT")
//         const {id} = jwt.verify(token,"SECRETKEYJWT")
//         console.log(id)
//         // req.id is like req.session.passport.user as it takes the current came user of browser
//         req.id = id
//         next();
//         // res.json({token});
//     }
//     catch(err){
//         // console.log(err.message)
//         // res.status(500).json(err.message);
//         if(err.name === "JsonWebTokenError"){
//             // this error shows when 
//             return res.status(500).json({message : "can not access the resource"})
//         }else if(err.name  === "TokenExpiredError"){
//             return res.status(500).json({message : "session timeout! login again"})
//         }else{
//             res.status(500).json(err);
//         }
//     }
// }

// middlewere it can be done in file just it had to be imported to indexroute carefully
exports.isLoggedIn =async (req,res,next)=>{
    try{
        const token = req.cookies.token;

        // this checks that the last token present in cookies is similar to the toke of the user logged in

        // const data = jwt.verify(token,"SECRETKEYJWT")
        const {id} = jwt.verify(token,"SECRETKEYJWT")
        // console.log(id)
        // req.id is like req.session.passport.user as it takes the current came user of browser
        // req.id = id

        const user = await User.findById(id).exec();
        // const user = await User.findById(id).exec();
        // jo currently user hai wo same hai saved cookie wale user ke 
        req.user = user;
        
        next();
        // res.json({token});
    }
    catch(err){
        // console.log(err.message)
        // res.status(500).json(err.message);
        if(err.name === "JsonWebTokenError"){
            // this error shows when 
            return res.status(500).json({message : "can not access the resource"})
        }else if(err.name  === "TokenExpiredError"){
            return res.status(500).json({message : "session timeout! login again"})
        }else{
            res.status(500).json(err);
        }
    }
}