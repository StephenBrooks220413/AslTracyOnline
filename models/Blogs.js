
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String,
    image: String,
    message: String,
    datePosted: {
        type: Date,
        default: new Date()
    },
    username: String,
    email: String
})

const Blogs = mongoose.model('BlogPost', BlogPostSchema);
module.exports = Blogs;