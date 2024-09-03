const mongoose = require('mongoose');

// create schema for user
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true
    },
    amount : {
        type : Number,
        default : 5000
    },
    orderHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderHistory'
    }],
    otp : {
        type : Number,
    }
})

// create model 
const User = mongoose.model("User", userSchema);

module.exports = User;