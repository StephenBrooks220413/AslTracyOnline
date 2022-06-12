const BlogPost = require('../models/Blogs');

module.exports = async (req, res)=>{
    const blog = await BlogPost.findById(req.params.id)
    res.render('post', {
        blog
    })
}