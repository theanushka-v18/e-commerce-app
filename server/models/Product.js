const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// create schema for Size
const SizeSchema = new mongoose.Schema({
  size: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 }
});

// create schema for Product
const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productDesc: {
    type: String,
    required: true,
  },
  productPrice: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  productRating: {
    type: Number,
    required: true,
  },
  productCategory: {
    type: String,
    required: true,
  },
  reviews: [reviewSchema],
  numReviews: {
    type: Number,
    default: 0,
  },
  sizes : [SizeSchema]
});

// create model
const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
