const BlogPost = require('../models/Reviews');
const path = require("path");

module.exports = async (req, res)=>{
    let image = req.files.image;
    image.mv(path.resolve(__dirname, '..' ,'public/uploads', image.name),async(error)=>{
        await BlogPost.create({
            ...req.body,
            image: '/uploads/' + image.name
        })
        res.redirect('/')
    })
}