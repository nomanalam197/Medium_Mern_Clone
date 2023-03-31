const User = require("../models/userModel");
const Blog = require("../models/blogModel")
const { sendToken } = require("../utils/auth")
const nodemailer = require("nodemailer");

// this formidable is like multer it just provide important keyword for uploading on cloud
const formidable = require("formidable")
const cloudinary = require("cloudinary");
const { Store } = require("express-session");

// credentials for cloudinary database access
cloudinary.config({
    cloud_name: "dcwssmv6l",
    api_key: "294166572315126",
    api_secret: "0GlJcVr9h9pduPOTbRoDC7MZZCM",
    secure: true
})
// some routes for frontend requirement

//
exports.homepage = (req, res, next) => {

    // iss mein islogged in mein req.id bheja gya tha as a notification from islogged in but 
    // after change due to error in create blog route we have to sebd the whole user through middleware

    // res.send("This is homepage..." + req.id);

    // after change
    res.json({ message: "This is homepage...", user: req.user });

    // res.json({})
};

exports.signup = async (req, res, next) => {
    try {
        // res.send(req.body);


        let user = await User.findOne({ email: req.body.email }).exec();

        if (user) {
            return res.status(501).json({ message: "user exists" });
        }

        const newuser = new User(req.body);

        const SavedUser = await newuser.save();

        // res.json(SavedUser)
        // signup hote hai signin and session created
        sendToken(SavedUser, req, res, 200);


    } catch (err) {
        res.status(501).json({ message: err.message, second: "signup error" });
    }

}

exports.signin = async (req, res, next) => {
    try {

        const { email, password } = req.body;
        // let user = await User.findOne({ email }).exec();

        /* we had written .select and specified password in it just we because we had specified 
            select: false, in the usermodel of password */
        let user = await User.findOne({ email }).select("+password").exec();

        // console.log(user)
        if (!user) {
            return res.status(404).json({ message: "user not found", second: "email check" });
        }

        // hmlogo ne pehle user dhundha fir us ** particular user ke comparepass function ko call kiya
        // comparepassword usi user schema jisko yha se find kiya gya and call kiya gya
        const matchPassword = user.comparePassword(password);
        if (!matchPassword) {
            return res.status(500).json({ message: "wrong credientials" });
        }

        // it is just general making user sigh in and transfring its data directly render it doesnot have 
        // particular that how much time till it will get accessed
        // res.send(user);


        // user loggedin hote wkt saara details ek function ke zriye auth file mein bhej diya jaata hai btane ke liye ki
        // kon se user ke schema ko access krna hai taaki uske schema gettoken function active kiya jae
        // if you are sending response in sendtoken than do not sent res here        
        // import pr dhyan do yha pr data bheja jaa rah taaki isi user ke get token ko activate kiya jae

        sendToken(user, req, res, 200);

        // ** we can also make the whole auth work directly to the userModel itself below is one of its calling 
        // procedure console.log below depends that from sendtoke function response is send or return value

        // const createdtoken = user.sendToken(user, req, res, 200);
        // console.log(createdtoken)

    }
    catch (err) {
        res.status(501).json({ message: err.message, second: "signIn error" });

    }
}

exports.signout = (req, res, next) => {
    res.clearCookie("token");
    res.status(200).json({ message: "logged out sexsexfully" });
};

exports.sendMail = async (req, res, next) => {
    try {

        const { email } = req.body;
        // console.log(email);
        const user = await User.findOne({ email }).exec();
        // console.log(user)
        if (!user) {
            return res.status(404).json({ message: "user not found." });
        }
        // const pageurl = req.protocol + "://" + req.get("host") + "/forget-password/" + user._id;
        const pageurl = req.protocol + "://" + "localhost:3000" + "/forget-password/" + user._id;
        // console.log(pageurl);

        const transport = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: "n.arocks10@gmail.com",
                pass: "nsidwoqvippomfrv",
            },
        });

        const mailOptions = {
            from: "Noman Pvt. Ltd.<n.arocks10@gmail.com>",
            to: req.body.email,
            subject: "Password Reset Link",
            text: "Do not share this link to anyone.",
            html: `<a href=${pageurl}>Password Reset Link</a>`,
        };

        transport.sendMail(mailOptions, async (err, info) => {
            if (err) return res.status(500).json({ message: err });
            // console.log(info);

            // below we had send passwordResetToken set to 1 is schema just because it is like toggle switch
            // for activation of forgot password link once password will change it will change back to 0 by
            ///forget-password/:id route
            await User.findByIdAndUpdate(user._id, { passwordResetToken: 1 });

            res.status(200).json({
                message: "Email sent! check inbox/spam",
            });
        });

    }
    catch (error) {
        res.status(500).json({ message: error.message, Tag: "send recovery link of password link error" })
    }

};

// changed this new password wala concept after changing code of frontend
exports.forgetpassword = async (req, res, next) => {
    try {

        const user = await User.findById(req.params.id).select("+password").exec();
        console.log(req.params.id)
        console.log(req.body)
        // const newPassword = req.body.newpassword;
        const { newpassword } = req.body;
        // const confirmPassword = req.body.confirmpassword;
        const { confirmpassword } = req.body;

        if (user.passwordResetToken === 1 && newpassword === confirmpassword) {
            // if (user.passwordResetToken === 1) {
            user.passwordResetToken = 0;
            user.password = confirmpassword;
            // user.password = req.body.password;
            await user.save();
            res.status(200).json({ message: "password changed!" });
        } else {
            // it is just to specify that this link will be used only once after that passwordResetToken will
            // be set to 0 means link used one time so when in if condition next time the user click on
            // in if condition it will show and its value is not 1 its actually 0 means its already been
            // used ones so it will come in this else part
            res.status(500).json({ message: "link expired! try again" });
        }

    } catch (error) {
        res.status(500).json({ message: error.message, Tag: "forgot password link error" });
    }
}

exports.changepassword = async (req, res, next) => {

    const newPassword = req.body.newpassword;
    const confirmPassword = req.body.confirmpassword;

    if (newPassword === confirmPassword) {
        // req.id is not working we should have to go with params
        // console.log(req.id)
        // const user = await User.findById(req.id);
        console.log(req.params.id)
        const user = await User.findById(req.params.id);
        user.password = req.body.newpassword;
        await user.save();
        res.status(200).json({ message: "Password updated" });
    }
}

exports.updatedata = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (req.body.name) {
        user.name = req.body.name;
        await user.save();
    }
    if (req.body.username) {
        user.username = req.body.username;
        await user.save();
    }
    if (req.body.email) {
        user.email = req.body.email;
        await user.save();
    }
    if (req.body.bio) {
        user.bio = req.body.bio;
        await user.save();
    }
    if (req.body.about) {
        user.about = req.body.about;
        await user.save();
    }
    res.status(200).json({ message: "Data updated" });
}

exports.deleteuser = async (req, res, next) => {
    // console.log(req.params.id)
    const user = await User.findOneAndDelete(req.params.id);

    // console.log(user.stories)
    user.stories.map(async (blogOwn) => {
        // console.log(myFunction.id)   
        const deletedBlogs = await Blog.findByIdAndDelete(blogOwn.id);
    })

    // res.redirect("/signup");

    res.status(200).json({ message: "User Deleted" });
}
// const user = await User.findById(req.params. for user);
// user.stories.findOneAndDelete(req.params.id for blog)

exports.upload = async (req, res, next) => {
    try {
        const form = formidable();
        form.parse(req, async (err, fields, files) => {
            if (err) return res.status(500).json({ message: err });
            // it is the page which is logged in so req.id is possible
            // const user = await User.findById(req.id).exec();

            // aab create blog wale route ke wjh se middleware islogged in se pura user aaya so change in code slightly
            const user = await User.findById(req.user._id).exec();
            if (files) {
                // yha pein files.blog.filepath apn .blog isiliye likhe just because we had send 
                // data from editor js to here with blog keyword reference generally it is in the form of 
                // files.imagefilepath
                const { public_id, secure_url } = await cloudinary.v2.uploader.upload(files.blog.filepath, {
                    folder: "R8",
                    width: 1920,
                    crop: 'scale',
                })
                user.avatar = { public_id, url: secure_url };
                // user.avatar = {public_id: public_id, url: secure_url};
                await user.save();
                res.status(200).json({ message: "Image uploaded" });
            }
            else {
                res.status(500).json({ message: "No file uploaded" });
            }
        })

    } catch (error) {
        res.status(500).json(error);
    }
}

// to upload blog without user info in cloudinary
exports.uploadBlog = async (req, res, next) => {
    try {
        const form = formidable();
        form.parse(req, async (err, fields, files) => {
            if (err) return res.status(500).json({ message: err });
            // it is the page which is logged in so req.id is possible
            // const user = await User.findById(req.id).exec();

            // aab create blog wale route ke wjh se middleware islogged in se pura user aaya so change in code slightly
            // const user = await User.findById(req.user._id).exec();
            if (files) {
                // yha pein files.blog.filepath apn .blog isiliye likhe just because we had send 
                // data from editor js to here with blog keyword reference generally it is in the form of 
                // files.imagefilepath

                // console.log(files)

                const { public_id, secure_url } = await cloudinary.v2.uploader.upload(files.blog.filepath, {
                    folder: "editorblog",
                    width: 1280,
                    crop: 'scale',
                })

                // user.avatar = {public_id, url: secure_url};

                // user.avatar = {public_id: public_id, url: secure_url};

                // await user.save();
                // res.status(200).json({message: "Image uploaded"});

                res.status(200).json({
                    success: 1,
                    file: {
                        url: secure_url
                    }
                })
            }
            else {
                res.status(500).json({ message: "No file uploaded" });
            }
        })

    } catch (error) {
        res.status(500).json(error);
    }
}

// to create blogs
exports.createstories = async (req, res, next) => {
    try {
        // console.log(req.user); // from middleware

        // ** iske wjh se middleware se id ke jgh pura user mngwana pda just because 
        // yha pein database mein change kiya gya aur id bhejte to sirf id aata pura data nahi to
        // aadha data kaise save hota kind of nahi ho paa rha tha with the help of id only

        const blog = new Blog({ ...req.body, author: req.user._id });
        await req.user.stories.push(blog._id);
        await blog.save();
        await req.user.save();
        res.status(201).json({ message: "blog posted" });

    } catch (err) {
        res.status(500).json(err);

    }
}

// to show blogs of a particular user
exports.showstories = async (req, res, next) => {
    try {
        // console.log(req.user); // from middleware

        // ** iske wjh se middleware se id ke jgh pura user mngwana pda just because 
        // yha pein database mein change kiya gya aur id bhejte to sirf id aata pura data nahi to
        // aadha data kaise save hota kind of nahi ho paa rha tha with the help of id only

        // const particularBlogsPerUser = await req.user.populate("stories").exec();
        // res.status(201).json({message: "blog of a user", blog: particularBlogsPerUser});
        const { stories } = await User.findById(req.user._id).populate("stories").exec();
        res.status(201).json({ message: "blog of a user", blog: stories });

    } catch (err) {
        res.status(500).json(err);

    }
}

//loaduser
exports.currentuser = async (req, res, next) => {
    // if(req.user){
    const user = await User.findById(req.user._id).populate(
        {
            path: "stories",
            populate: {
                path: "author"
            }
        }
    ).populate(
        {
            path: "lists",
            populate: {
                path: "author"
            }
        }
    ).exec();

    if (user) {
        res.status(200).json({ user: user })
    }
    // }
}

// all blogs
exports.blogs = async (req, res, next) => {
    try {

        const blogs = await Blog.find().populate("author").exec();
        res.status(200).json({ message: "all blogs", blogs })
    } catch (err) {
        res.status(500).json(err);
    }
}

// its like save and unsave reel
exports.listblog = async (req, res, next) => {
    try {
        const { blogid } = req.params;
        if (!req.user.lists.includes(blogid)) {
            req.user.lists.push(blogid);
            await req.user.save();
            res.status(200).json({ message: "blog saved to user list" })
        } else {
            const blogIndex = req.user.lists.findIndex((blog) => blog._id === blogid)
            req.user.lists.splice(blogIndex, 1);
            await req.user.save();
            res.status(200).json({ message: "blog unsaved from user list" })
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

// in react export and import is done in format
// export default app
// import app from '../firebase/config'

// deleteblog bhi bna skte hai bs uske params se id lelo and fir usko findoneanddelete and fir uske author ko
// target krke uske stories mein se bhi blog delete