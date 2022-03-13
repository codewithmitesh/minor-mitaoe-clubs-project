const express = require('express')
const router = express.Router();
const adminController = require('../controllers/adminController')
const auth = require('../middlewares/auth')
// /admin
router.get('/',auth.isAuthenticatd,auth.isFaculty,adminController.adminDashboard)
router.get('/new',auth.isAuthenticatd,auth.isFaculty,adminController.createClubForm)
router.post('/new',auth.isAuthenticatd,auth.isFaculty,adminController.createClub)
module.exports = router;