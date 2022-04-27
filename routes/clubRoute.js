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
router.get('/',clubController.index)  // home page

router.get('/my',clubController.myClubs) // not implemented

router.get('/:id',clubController.getOneClub);


/// student admin routes
router.get('/edit/:id',clubController.getEditClubPage);  // id == slug

router.get('/teams/new/:id',clubController.getCreateTeamPage)
router.get('/events/new/:id',clubController.getCreateEventPage)

// router.post('/edit/:id')


router.post('/join/:id')


/*
 
*/

module.exports = router;