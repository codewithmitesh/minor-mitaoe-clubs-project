const express =require('express');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const app = express();
const landingRouter = require('./routes/landingRoute')
const clubRouter = require('./routes/clubRoute');
const adminRouter = require('./routes/adminRoute')

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine","pug")
app.use(express.static('public')) 
app.use(cookieParser())

app.use('/',landingRouter) 
app.use('/clubs',clubRouter)
app.use('/admin',adminRouter)
 
app.get('*',(req,res)=>{
    res.send("404")
})
module.exports = app;