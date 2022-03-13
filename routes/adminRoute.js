const express = require('express')
const router = express.Router();
const adminController = require('../controllers/adminController')
const auth = require('../middlewares/auth')
// /admin
router.get('/',adminController.adminDashboard)
router.get('/new',adminController.createClubForm)

router.post('/new',adminController.createClub)

router.post('/:id',adminController.makeAdmin)


module.exports = router;