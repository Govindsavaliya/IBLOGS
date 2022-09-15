const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
    title: {
        type: String,
        required :true
    },
    description: {
        type: String,
        required :true
    },
    author: {
        type: String,
        required :true
    },
    date: {
        type: String,
        required :true
    },
    category: {
        type: String,
        required :true
    },  
})

// we will create a new collection

const Blog = new mongoose.model('Blog', userSchema);

module.exports = Blog;