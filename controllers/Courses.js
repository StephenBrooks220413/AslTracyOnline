const Lessons = require('../models/Courses');

module.exports = async (req, res)=>{
    const courses = await Lessons.find({}).limit(40).sort({_id: -1});
    res.render('courses', {
        courses
    })
}
