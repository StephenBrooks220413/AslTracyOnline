const Course = require('../models/Courses');
const path = require("path");

module.exports = async (req, res)=>{
    let image = req.files.image;
    image.mv(path.resolve(__dirname, '..' ,'public/uploads', image.name),async(error)=>{
        await Course.create({
            ...req.body,
            image: '/uploads/' + image.name
        })
        res.redirect('/')
    })
}