const BlogPost = require('../models/Blogs')
const User = require('../models/User')
const Terp = require('../models/Terp')
const Course = require('../models/Courses')
const Review = require('../models/Reviews')

module.exports = async (req, res) => {
    const blogs = await BlogPost.find({}).limit(1).sort({_id: -1})
    const user = await User.find({}).limit(1).sort({_id: -1})
    const terp = await Terp.find({}).limit(1).sort({_id: -1})
    const course = await Course.find({}).limit(1).sort({_id: -1})
    const reviews = await Review.find({}).limit(3).sort({_id: -1})
    res.render('index', {
        blogs, user, terp, course, reviews
    })
}