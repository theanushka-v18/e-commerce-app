const mongoose = require('mongoose');

// create schema for user
const orderHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        productCount: {
            type: Number,
            required: true
        },
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
        productSize : {
            type : String,
            required : true
        }
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
})

// create model 
const OrderHistory = mongoose.model("OrderHistory", orderHistorySchema);

module.exports = OrderHistory;