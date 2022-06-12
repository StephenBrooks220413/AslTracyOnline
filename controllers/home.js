const BlogPost = require('../models/Blogs')
const User = require('../models/User')
const Review = require('../models/Reviews')
const Course = require('../models/Courses')

module.exports = async (req, res) => {
    const blogs = await BlogPost.find({}).limit(1).sort({_id: -1})
    const user = await User.find({}).limit(1).sort({_id: -1})
    const reviews = await Review.find({}).limit(1).sort({_id: -1})
    const course = await Course.find({}).limit(1).sort({_id: -1})
    res.render('index', {
        blogs, user, reviews, course
    })
}