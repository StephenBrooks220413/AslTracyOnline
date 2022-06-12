const LessonPost = require('../models/Courses')

module.exports = async (req, res) => {
    const course = await LessonPost.findById(req.params.id)
    res.render('course', {
        course
    })
}