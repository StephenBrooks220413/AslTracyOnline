const Terp = require('../models/Terp');

module.exports = async (req, res)=>{
    const terps = await Terp.find({}).limit(20).sort({_id: -1});
    res.render('terps', {
        terps
    })
}