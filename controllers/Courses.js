const Courses = require('../models/Courses');

module.exports = async (req, res)=>{
    const courses = await Courses.find({}).limit(40).sort({_id: -1});
    res.render('courses', {
        courses
    })
}