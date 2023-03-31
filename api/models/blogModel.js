const mongoose = require('mongoose');

const blogModel = new mongoose.Schema(
    {   
        // url: {
        //     type: String,
        //     required: [true, "Blog description is required"],
        // },
        // heading: {
        //     type: String,
        //     required: [true, "Blog description is required"],
        // },
        data: {
            type: String,
            required: [true, "Blog description is required"],
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        comments: []
        
    },
    { timestamps: true }
);

const blog = mongoose.model("blog", blogModel);

module.exports = blog;