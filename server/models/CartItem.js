const mongoose = require('mongoose');

// create schema for user
const CartItemSchema = new mongoose.Schema({
    productName : {
        type : String,
        required : true
    },
    productPrice : {
        type : String,
        required : true
    },
    productImage : {
        type : String,
        required : true
    },
    productCount : {
        type : Number,
        required : true
    },
    productSize : {
        type : String,
        required : true
    },
    productColor : {
        type : String,
        required : true
    },
    productId : {
        type : String,
        required : true
    }
})

// create model 
const CartItem = mongoose.model("CartItem", CartItemSchema);

module.exports = CartItem;