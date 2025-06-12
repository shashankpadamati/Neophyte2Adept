const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    gender: {
        type: String
    },
    dateOfBirth:{
        type: String
    },
    bio: {
        type: String,
        trim: true
    },
    contactNumber: {
        type: Number,
        trim: true
    },
    profession: {
        type: String
    }
})

module.exports = mongoose.model("Profile",profileSchema)