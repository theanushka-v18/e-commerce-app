const CartItem = require("../models/CartItem");
const OrderHistory = require("../models/OrderHistory");
const Product = require("../models/Product");
const User = require("../models/User")

async function handleAddProducts(req, res) {
    try {
        const { productName, productDesc, productPrice, productImage, productRating, productCategory } = req.body;
    
        const newProduct = new Product({
          productName,
          productDesc,
          productPrice,
          productImage,
          productRating,
          productCategory
        });
    
        const response = await newProduct.save();
        res.status(200).json(response);
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }
}

async function handleGetProducts(req, res) {
    try {
        const response = await Product.find();
        // console.log(response);
    
        res.status(200).json(response);
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }
}

async function handleGetProductById(req, res) {
  try {
    const productId = req.params.id;
    const response = await Product.findById(productId);
    res.status(200).json(response);
  } catch(error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleAddProductToCart(req, res) {
  try {
    const {userId, productName, productId, productImage, productPrice, productColor, productSize, productCount} = req.body;
    
    if (!userId || !productId || !productName || !productPrice || !productImage || !productColor || !productSize || !productCount) {
      console.log('controller data', productColor, productCount, productId, productName, productSize);
      return res.status(400).json({ error: "Missing required fields" });
    }
    const existingCartItem = await CartItem.findOne({
      userId,
      productId
    });

    if (existingCartItem) {
      // If the item exists, update the productCount
      existingCartItem.productCount += productCount;
      const updatedCartItem = await existingCartItem.save();
      return res.status(200).json(updatedCartItem);
    } else {
      // If the item does not exist, create a new cart item
      const newCartItem = new CartItem({
        userId,
        productName,
        productId,
        productPrice,
        productImage,
        productColor,
        productSize,
        productCount,
      });
      const response = await newCartItem.save();
      res.status(200).json(response);
    }
  } catch(error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleGetCartItems(req, res) {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: "Missing userId parameter" });
    }
    const response = await CartItem.find({userId});
    res.status(200).json(response);
  } catch(error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleRemoveCartItem(req, res) {
  try {
    const { id } = req.params;
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: "Missing userId parameter" });
    }
    
    const response = await CartItem.findByIdAndDelete({ _id: id, userId: userId });
    res.status(200).json(response);
  } catch(error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleUpdateProductCount(req, res) {
  try {
    const id = req.params.id;
    const { userId } = req.query;
    const data = req.body;
    // console.log('userId', userId);
    

    if (!userId) {
      return res.status(400).json({ error: "Missing userId parameter" });
    }

    const response = await CartItem.findByIdAndUpdate({ _id: id, userId: userId }, data, {
      new: true, // it returns the updated data
      runValidators: true, // it will run mongoose validators
    });
    // console.log('data updated');
    res.status(200).json(response);

    if(!response) {
      res.status(404).json({ error: "Cart item not found" });
    }
    
  } catch(error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleDeleteAllCartItems(req, res) {
  try {
    const {userId} = req.query;
    const response = await CartItem.deleteMany({userId});   
    res.status(200).json(response);
  } catch(error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleAddProductReview(req, res) {
    try {
      const {rating, comment, userId} = req.body;
      const {productId} = req.params;

      console.log(rating, comment, userId, productId);
      if (typeof comment !== 'string' || comment.trim() === '') {
        return res.status(400).json({ message: 'Invalid comment' });
      }
      
      const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

     // Check if the user has already reviewed this product
     const existingReviewIndex = product.reviews.findIndex(
      review => review.user.toString() === userId
    );
    console.log('existingReviewIndex', existingReviewIndex);
    

    if (existingReviewIndex !== -1) {
      // Update existing review
      product.reviews[existingReviewIndex] = {
        ...product.reviews[existingReviewIndex].toObject(),
        rating: Number(rating),
        comment
      };
    } else {
      // Add new review
      const review = {
        user: userId,
        name: user.username,
        rating: Number(rating),
        comment
      };
      product.reviews.push(review);
    }

    // Update numReviews and productRating
    product.numReviews = product.reviews.length;
    product.productRating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save();
    res.status(200).json({ message: 'Review updated' });

    } catch(error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
}

async function handleCreateOrder(req, res) {
  try {
    const { userId, items, totalPrice } = req.body;

    const newOrder = new OrderHistory({
        userId,
        items,
        totalPrice
    });

    const savedOrder = await newOrder.save();

    res.status(200).json(savedOrder);
  } catch(error) {
    res.status(500).json({ message: error.message });
  }
}

async function handleUpdateOrderHistory(req, res) {
  try {
    const { userId, orderId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    user.orderHistory.push(orderId);
    await user.save();

    res.status(200).json(user);
  } catch(error) {
    res.status(500).json({ message: error.message });
  }
}

async function handleGetOrderHistory(req, res) {
  try {
    const {userId} = req.query;
    const user = await User.findById(userId);
    const allOrders = await Promise.all(
      user.orderHistory.map(async (orderId) => {
        const order = await OrderHistory.findById(orderId);
        return order;
      })
    );
    res.status(200).json(allOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
    handleAddProducts,
    handleGetProducts,
    handleGetProductById,
    handleAddProductToCart,
    handleGetCartItems,
    handleRemoveCartItem,
    handleUpdateProductCount,
    handleDeleteAllCartItems,
    handleAddProductReview,
    handleCreateOrder,
    handleUpdateOrderHistory,
    handleGetOrderHistory
}