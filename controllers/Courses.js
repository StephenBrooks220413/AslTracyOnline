const Lessons = require('../models/Courses');

module.exports = async (req, res)=>{
<<<<<<< HEAD
    const CoursePost = await Lessons.find({}).limit(40).sort({_id: -1});
=======
    const courses = await Lessons.find({}).limit(40).sort({_id: -1});
>>>>>>> 54a1cb996568b84b906ae5f3901380a627530a41
    res.render('courses', {
        CoursePost
    })
}
