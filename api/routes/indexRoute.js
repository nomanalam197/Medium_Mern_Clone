const express = require("express");
const router = express.Router();
const { homepage, signup, signin, signout, sendMail, forgetpassword, upload, changepassword,
     updatedata, deleteuser, createstories, blogs, showstories, listblog, currentuser, uploadBlog} = require("../controllers/indexController")
const {isLoggedIn} = require("../utils/auth")

// hosts for frontend usage
router.get("/loaduser", isLoggedIn , currentuser);

//

// router.get("/",(req,res,next)=>{
//     res.send("Index page, our home page")
// })
// above written code is not the write way

// router.get('/', homepage);
// router.route("/").get(homepage);
// router.get("/",homepage);

router.get("/", isLoggedIn ,homepage);


// post /signup - create user
router.post("/signup", signup);

// post /signIn - login user
router.post("/signin", signin);

router.get("/signout", isLoggedIn, signout);


// reset-password_change-password /change_password/:id , change the id with the data which will be send to
// while rendering
// /change_password/:63e286ad42f6d174a614b013
router.post("/change_password/:id", isLoggedIn, changepassword);
// router.post("/change_password", changepassword);

// update/:id
router.post("/update_data/:id", isLoggedIn, updatedata);
// router.post("/update_data/:id",updatedata);

// delete/:id
router.get("/delete/:id", deleteuser);


// get /send-mail - logout user
// router.get("/send-mail", sendMail)
router.post("/send-mail", sendMail)

// get /forget-password - send mail
router.post("/forget-password/:id", forgetpassword);

// get /upload - upload image
router.post("/upload", isLoggedIn, upload)

// /delete-upload

// cloudinary.uploader.destroy('zombie', function(result) { console.log(result) });

// get /create-blog - create blogs
router.post("/create-stories", isLoggedIn, createstories)

// get /blogs - show all blogs
router.get("/blogs", blogs)

// post /uploadBlog - save the blog to image to cloudinary
router.post('/uploadBlog', uploadBlog)

// get /blogs - show particular of a user blogs
router.get("/showstories", isLoggedIn,showstories)


// get /save/:blogid - save the blog to list of the user
router.get("/list/:blogid", isLoggedIn, listblog);


module.exports = router;