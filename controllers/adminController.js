const User = require('../models/userModel');
const Club = require('../models/clubModel');
const res = require('express/lib/response');
exports.adminDashboard = async(req,res)=>{  // get
    let users = await User.find();
    let clubs = await Club.find();
    let admins = [];
    for(let i=0;i<clubs.length;i++){
        let admin = await User.findOne({_id:clubs[i].admin})
        admins[i] = admin.full_name + " ("+ admin.email+")";
    }
    res.render('admin/dashboard',{
        userCount:users.length,
        clubCount:clubs.length,
        clubs:clubs,
        users:users,
        user:req.user,
        admins:admins
    })
}

exports.createClubForm = async(req,res)=>{   // get
    const users = await User.find({role:"Student"});
    res.render('admin/createClub',{
        user:req.user,
        users:users
    })
}

exports.createClub = async (req,res)=>{  // post
    try{
        let club = await Club.create({
            club_name:req.body.club_name,
            about:req.body.about,
            admin:req.body.admin,
            location:req.body.location,
            tag:req.body.tag
        }) 
        res.redirect('/clubs')
    }catch(err){
        res.json({
            success:false,
            message:err.message
        })
    }
}

exports.makeAdmin = async (req,res)=>{
    let user = await User.findById({_id:req.params.id})
    if(user.role == "Student")
        user = await User.updateOne({_id:req.params.id},{role:"Teacher"})
    else    
        user = await User.updateOne({_id:req.params.id},{role:"Student"})
    res.redirect('/admin')
}