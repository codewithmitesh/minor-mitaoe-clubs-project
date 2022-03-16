
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
        const club = await Club.findOne({slug:req.params.id})
        res.render('clubs/view',{
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
        success:true,
        user:req.user
    })
}

/* 
---club admin routes --- 
edit club page, 
create team,
create event page

*/