const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoursesSchema = new Schema({
    title: String,
    image: String,
    body: String,
    datePosted: {
        type: Date,
        default: new Date()
    },
    instructor: String,
    email: String
})

const Courses = mongoose.model('Courses', CoursesSchema);
module.exports = Courses;