const CartItem = require("../models/CartItem");
const Product = require("../models/Product");

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
    const {productName, productId, productImage, productPrice, productColor, productSize, productCount} = req.body;
    
    if (!productId || !productName || !productPrice || !productImage || !productColor || !productSize || !productCount) {
      console.log('controller data', productColor, productCount, productId, productName, productSize);
      return res.status(400).json({ error: "Missing required fields" });
    }
    const existingCartItem = await CartItem.findOne({
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
    
    const response = await CartItem.find();
    res.status(200).json(response);
  } catch(error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleRemoveCartItem(req, res) {
  try {
    const { id } = req.params;
    console.log('id = ', id);
    
    const response = await CartItem.findByIdAndDelete(id);
    res.status(200).json(response);
  } catch(error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleUpdateProductCount(req, res) {
  try {
    const id = req.params.id;
    const data = req.body;

    const response = await CartItem.findByIdAndUpdate(id, data, {
      new: true, // it returns the updated data
      runValidators: true, // it will run mongoose validators
    });
    console.log('data updated');
    res.status(200).json(response);

    if(!response) {
      res.status(404).json({ error: "Cart item not found" });
    }
    
  } catch(error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
    handleAddProducts,
    handleGetProducts,
    handleGetProductById,
    handleAddProductToCart,
    handleGetCartItems,
    handleRemoveCartItem,
    handleUpdateProductCount
}