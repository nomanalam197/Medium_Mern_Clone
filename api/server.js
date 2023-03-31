// dotenv is use to handle env perfectly
require("dotenv").config({path: "./.env"})

const express = require("express");
const app = express();
const PORT = process.env.PORT;
const indexRouter = require('./routes/indexRoute')

// const { isLoggedIn } = require("./utils/auth")


// it is used to do operations of cookieparser like done in middleware like isLoggedin
const cookieParser = require('cookie-parser')

// for controlling the logged in session
const session = require("express-session")


// attching database here
// dont forgot to add bracket () with imported functin here it is databseConnection
require("./models/database").databaseConnection();

// using the cookieparser requried above
// it is used to do operations of cookieparser like done in middleware like isLoggedin
app.use(cookieParser());

// it is in place of body parser to accept route
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// cors is to run node and react in the same project here origin should be always that port which 
// should is conencted to frontend always change it after you had made the frontend
// app.use(require("cors")({credentials: true, orgin: process.env.originBackend}));

// cors mein se origin hta do kyunki wo 3001 frontend ka code hai auer yha sirf 3000 ke liye specified thi
// app.use(require("cors")({ credentials: true }));

// yha pein apn frontend ke port ko backend mein introduce kra rhe and saath hi credentials ko change krne de rhe
//  hai permission 
app.use(
    require("cors")({ origin: "http://localhost:3000", credentials: true })
);



// this makes able jwt allow to make a session
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: "jk43t9"
    })
)

// it is like express generator
// created routes comes to route js ones specially the default route
app.use("/", indexRouter);

// only get route is needed to be shown their.. as post route is not needed to show on port


// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("views/build"));
//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "views", "build", "index.html"));
//     });
// }

// // error handler
// app.use(function (err, req, res, next) {
//     res.locals.message = err.message;
//     res.locals.error = err;
//     res.status(500).json({ error: err });
// });

app.listen(PORT, ()=> console.log(`server running on ${PORT}`))