
const Club = require('../models/clubModel')

exports.index = async(req,res)=>{
    const clubs = await Club.find();
    res.render('clubs/index',{
        user:req.user,
        clubs:clubs
    })
}