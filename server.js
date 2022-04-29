const app = require('./app')
const dotenv = require('dotenv')
const mongoose = require('mongoose');
dotenv.config({
    path: './config.env'
});

mongoose.connect(process.env.DATABASEURL).then(() => {
    console.log("DATABASE Connected");
}).catch(() => {
    console.log('DATABASE Not Connected');
})

app.listen(process.env.PORT, () => {
    console.log("Server is Running");
})