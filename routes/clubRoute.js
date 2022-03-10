const express = require('express')
const auth = require('../middlewares/auth') 
const clubController = require('../controllers/clubController')
const router = express.Router()

// router.get('/',auth.isAuthenticatd,(req,res)=>{
//     res.render('clubs/index',{
//         user:req.user,
//         club:[]
//     })
// })
router.get('/',auth.isAuthenticatd,clubController.index)

/*
 
*/

module.exports = router;