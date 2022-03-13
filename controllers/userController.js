
const User = require('../models/userModel')

exports.signup = async (req,res)=>{
    try{
        let user = await User.find({email:req.body.email})
        if(user == []){
            return res.json({
                success:false,
                message:"Email already exists"
            })
        }
        user = await User.create({
            full_name:req.body.full_name,
            email:req.body.email,
            mobile_number:req.body.mobile_number,
            prn:req.body.prn,
            study_year:req.body.study_year,
            department:req.body.department,
            password:req.body.password 
        })
        // res.json({
        //     success:true,
        //     data:user
        // })
        res.redirect("/login")
    }catch(err){ 
        res.render('landing/signup',{
            success:false,
            message:err.message,
            user:{
                full_name:req.body.full_name,
                email:req.body.email,
                mobile_number:req.body.mobile_number,
                prn:req.body.prn,
                study_year:req.body.study_year,
                department:req.body.department,
                password:req.body.password 
            }
        })
    }
}

exports.login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email}).select("+password")
        if(!user){
            return res.render('landing/login',{
                success:false,
                message:"User doesn't exist"
            })
        }
        isMatch = await user.matchPassword(password) 

        if(!isMatch){
            return res.render('landing/login',{
                success:false,
                message:"Incorrect Passowrd"
            })
        }
        const token = await user.generateToken();

        // res.status(200).cookie("token",token,{expiresIn:new Date(Date.now()+1*24*60*60*1000),httpOnly:true}).json({
        //     success:true,
        //     user,
        //     token
        // })
        res.status(200).cookie("token",token,{expires:new Date(Date.now()+1*24*60*60*1000),httpOnly:true}).redirect('/clubs')

    }catch(err){
        res.json({
            success:false,
            message:err.message
        })
    }
}

exports.logout = (req,res)=>{
    res.clearCookie('token');
    res.redirect("/login")
}