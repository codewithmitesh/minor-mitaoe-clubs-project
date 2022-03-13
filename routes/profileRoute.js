const express = require('express')
const router = express.Router();
const auth = require('../middlewares/auth')
const profileController = require('../controllers/profilController')


router.get('/account',profileController.account)

router.post('/account',profileController.updateAccount)



module.exports = router;