const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('landing/index')
})
router.get('/signup',(req,res)=>{
    res.render("landing/signup")
})
router.get('/login',(req,res)=>{
    res.render("landing/login")
})

router.post('/signup',userController.signup)
router.post('/login',userController.login)
router.get('/logout',userController.logout)

module.exports = router;