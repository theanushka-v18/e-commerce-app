const mongoose = require('mongoose');

// create schema for user
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true
    }
})

// create model 
const User = mongoose.model("User", userSchema);

module.exports = User;