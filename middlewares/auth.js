const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

exports.isAuthenticatd = async(req,res,next)=>{
    try{
        const {token} =req.cookies;
    if(!token){
        return res.json({
            message:"Please login"
        })
    }
    const decoded = await jwt.verify(token,process.env.JWT_SECRET)

    req.user = await User.findById(decoded._id)
    next()
    }catch(err){
        // res.json({
        //     success:false,
        //     message:err.message
        // })
        res.redirect("/login")
    }
    
}