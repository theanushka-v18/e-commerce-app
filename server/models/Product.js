const mongoose = require('mongoose');

// create schema for Product
const ProductSchema = new mongoose.Schema({
    productName : {
        type : String,
        required : true
    }, 
    productDesc : {
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
    productRating : {
        type : Number,
        required : true
    },
    productCategory : {
        type : String,
        required : true
    }
})

// create model
const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;