const User = require('../models/userModel');
const Club = require('../models/clubModel');

exports.adminDashboard = async(req,res)=>{  // get
    let users = await User.find();
    let clubs = await Club.find();
    let admins = [];
    for(let i=0;i<clubs.length;i++){
        let admin = await User.findOne({_id:clubs[i].admin})
        admins[i] = admin.full_name + " (" + admin.email+")";
        // admins[i] = admin.full_name 
        // console.log(admin);
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

exports.makeAdmin = async (req,res)=>{  // post
    let user = await User.findById({_id:req.params.id})
    if(user.role == "Student")
        user = await User.updateOne({_id:req.params.id},{role:"Teacher"})
    else    
        user = await User.updateOne({_id:req.params.id},{role:"Student"})
    res.redirect('/admin')
}

exports.deleteUser = async (req,res)=>{
    const user = await User.deleteOne({_id:req.params.id})
    res.redirect('/admin')
}

exports.deleteClub = async (req,res)=>{
    const club = await Club.deleteOne({_id:req.params.id})
    res.redirect('/admin')
}

/**
 * 
 * edit club admin
 * delete club
 */