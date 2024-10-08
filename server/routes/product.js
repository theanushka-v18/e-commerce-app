const express = require("express");
const {handleAddProducts, handleGetProducts, handleGetProductById, handleAddProductToCart, handleGetCartItems, handleRemoveCartItem, handleUpdateProductCount, handleDeleteAllCartItems, handleAddProductReview, handleCreateOrder, handleUpdateOrderHistory, handleGetOrderHistory} = require('../controllers/productControllers');
const { jwtAuthMiddleware } = require("../jwt");

const router = express.Router();

router.post("/addProducts", handleAddProducts);

router.get("/getProducts", handleGetProducts);

router.get('/getProductById/:id', handleGetProductById);

router.post('/addProductToCart', handleAddProductToCart);

router.get('/getCartItems', handleGetCartItems);

router.delete('/removeCartItem/:id', handleRemoveCartItem);

router.put('/updateProductCount/:id', handleUpdateProductCount);

router.delete('/deleteAllCartItems', handleDeleteAllCartItems);

router.post('/:productId/reviews', handleAddProductReview);

router.post('/createOrder', handleCreateOrder);

router.put('/updateOrderHistory', handleUpdateOrderHistory);

router.get('/getOrderHistory', handleGetOrderHistory);

module.exports = router;