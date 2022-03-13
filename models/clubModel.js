const mongoose = require('mongoose')

const clubSchema = new mongoose.Schema({
    club_name: {
        type: String,
        required: [true, "Please provide Club name"]
    },
    about: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    events: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event"
        }
    ],
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    Teams: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team"
        }
    ],
    location: {
        type: String,
        required: [true, "Please provide club location"]
    },
    instagram_url: {
        type: String
    }
    , facebook_url: {
        type: String
    },
    linkedin_url: {
        type: String
    },
    tag: {
        type: String,
        enum: ["Technical", "Non Technical", "Cultural", "Sports"]
    }
})

const Club = mongoose.model('Club', clubSchema);

module.exports = Club;