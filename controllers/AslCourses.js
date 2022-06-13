const Lessons = require('../models/AslCourses');

module.exports = async (req, res)=>{
    const CoursePost = await Lessons.find({}).limit(40).sort({_id: -1});
    res.render('courses', {
        CoursePost
    })
}
