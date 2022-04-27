
const Club = require('../models/clubModel');
const User = require('../models/userModel');
const Team = require('../models/teamModel');
const Event = require('../models/eventModel');


exports.index = async(req,res)=>{  // get home page
    const clubs = await Club.find();
    res.render('clubs/index',{
        user:req.user,
        clubs:clubs
    })
}

exports.getOneClub = async (req,res)=>{  // get 
    try {
        const club = await Club.findOne({slug:req.params.id})
        let studentCoordinator = await User.findOne({_id:club.admin});
        let facultyCoordinator = await User.findOne({_id:club.facultyCoordinator});
        // let teams = await Teams.find();
        res.render('clubs/view',{
            success:true,
            club:club,
            user:req.user,
            studentCoordinator:studentCoordinator.full_name, 
            facultyCoordinator:facultyCoordinator.full_name
        })
    } catch (err) {
        res.json({
            success:false,
            message:err.message
        })
    }
}

exports.myClubs = async (req,res)=>{    // not defined
    let clubs;
    let club;
    // console.log(req.user);
    // for(let i = 0; i < req.user.myclubs.length;i++){
        //     club = await Club.findOne({_id:element}) 
        //     clubs.push(club);
        // }
        
        
        res.json({
            success:true,
            user:req.user,
            clubs:clubs
        })
    }
    
    /* 
    ---club admin routes --- 
    edit club page, 
    create team,
    create event page

    */
    const isAdminOfClub = async (user_id,club_slub)=>{   // not implemented
        let club = await Club.findOne({slug:club_slub});
        let admin_id = await User.findOne({_id:club.admin});
        return user_id.prn == admin_id.prn;
    }

exports.getEditClubPage = async (req,res)=>{
    let club = await Club.findOne({slug:req.params.id});
    let admin_id = await User.findOne({_id:club.admin});

    if(admin_id.prn == req.user.prn){
        return res.json({
            success:true,
            user:req.user,
            club:club
        })
    }
    res.redirect('/clubs');
}

exports.getCreateTeamPage = async (req,res)=>{
    let club = await Club.findOne({slug:req.params.id});
    let admin_id = await User.findOne({_id:club.admin});

    if(admin_id.prn == req.user.prn){
        return res.json({
            success:true,
            user:req.user,
            club:club
        })
    }
    res.redirect('/clubs');
}


exports.getCreateEventPage = async (req,res)=>{
    let club = await Club.findOne({slug:req.params.id});
    let admin_id = await User.findOne({_id:club.admin});

    if(admin_id.prn == req.user.prn){
        return res.json({
            success:true,
            user:req.user,
            club:club
        })
    }
    res.redirect('/clubs');
}

exports.joinLeaveClub = async (req,res)=>{
    
}