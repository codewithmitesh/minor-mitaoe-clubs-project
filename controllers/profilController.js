const User = require('../models/userModel')



exports.account = async(req,res)=>{
    res.render('profile/account',{
        success:true,
        user:req.user
    })
}
exports.updateAccount = async (req,res)=>{
    try {
        const user = await User.updateOne({_id:req.user._id},req.body)
        console.log(user);
        res.redirect('/users/account')
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}
