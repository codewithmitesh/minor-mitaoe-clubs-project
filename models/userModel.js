const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    full_name:{
        type:String,
        required:[true,"Please Enter your full name"]
    },
    email:{
        type:String,
        required:[true,"Please Provide an email"],
        unique:true,
        validate:{
            validator: function(el){
                return el.endsWith('@mitaoe.ac.in')
        }
    }
    },
    mobile_number:{
        type:Number,
        required:[true,"Please provide mobile number"],
        unique:true,
        minlength:[10,"Mobile number should be of 10 digits"]
    },
    prn:{
        type:String,
        required:[true,"Please provide prn number"], 
        unique:true
    },
    study_year:{
        type:String,
        enum:["First Year","Second Year","Third Year","Fourth Year","Pass out"],
        required:[true,"Please provid your study year"]
    },
    department:{
        type:String,
        enum:["Computer Department","Mechanical Department","Electronics Department","Civil Department","Chemical Department"],
        required:[true,"Please provid your department"]
    },
    role:{
        type:String,
        enum:["Student","Teacher"],
        default:"Student"
    },
    password:{
        type:String,
        select:false,
        minlength:[8,"Password should be greater than 8 character"],
        required:[true,"Please provid your password"]
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    myclubs:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Club"
        }
    ],
    myevents:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Event"
        }
    ],
    instagram_url:{
        type:String,
        default:""
    }
    ,facebook_url:{
        type:String,
        default:""
    },
    linkedin_url:{
        type:String,
        default:""
    },
    twitter_url:{
        type:String,
        default:""
    },
    about:{
        type:String,
        default:""
    },
    profil_pic:{
        type:String,
        default:""
    }
})

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,8)
    }
    next()
})
userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateToken = function(){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET)
}
const User = mongoose.model("User",userSchema); 

module.exports = User;