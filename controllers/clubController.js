
const Club = require('../models/clubModel')

exports.index = async(req,res)=>{
    const clubs = await Club.find();
    res.render('clubs/index',{
        user:req.user,
        clubs:clubs
    })
}

exports.getOneClub = async (req,res)=>{
    try {
        const club = await Club.findOne({_id:req.params.id})
        res.json({
            success:true,
            club:club,
            user:req.user
        })
    } catch (err) {
        res.json({
            success:false,
            message:err.message
        })
    }
}

exports.myClubs = async (req,res)=>{
    
    res.json({
        success:req.user,
        
    })
}