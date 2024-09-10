import '../styles/productDetail.css';
import { Rating } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import CustomerReviews from '../components/CustomerReviews';
import { Bounce, toast } from 'react-toastify';

const ProductDetail = () => {
  const { productCount, setProductCount, selectedSize, setSelectedSize } =
    useCart();
  const [cartData, setCartData] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');

  const navigate = useNavigate();
  const { productDetail } = useAuth();

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
  };

  async function handleAddItemToCart() {
    if(selectedSize && selectedColor) {
      try {
        const response = await axios.post(
          'http://localhost:5000/products/addProductToCart',
          {
            userId: localStorage.getItem('id'),
            productId: productDetail?._id,
            productName: productDetail?.productName,
            productPrice: productDetail?.productPrice,
            productImage: productDetail?.productImage,
            productColor: selectedColor,
            productSize: selectedSize,
            productCount: productCount,
          }
        );
        setCartData(response.data);
        toast.success(`${productCount} item successfully added to the cart`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          transition: Bounce,
        });
        // console.log('cartData', cartData);
        // if (selectedSize) {
          navigate('/product/shopping-cart', { state: { selectedSize, selectedColor } });
        // }
      } catch (error:any) {
        console.log('error', error);
        
      }
    } else {
      toast.warn('Please select size and color of the product', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
      });
    }
  }

  return (
    <>
    <div className='product-detail-container'>
      <div className='image-container'>
        <img src={productDetail?.productImage} alt='product image' />
      </div>
      <div className='detail-container'>
        <h1>{productDetail?.productName}</h1>
        <span>
          <Rating
            name='half-rating-read'
            size='small'
            defaultValue={productDetail?.productRating}
            precision={0.5}
            readOnly
          />{' '}
          <span className='rating'>
            {productDetail?.productRating.toFixed(1)}/5
          </span>
        </span>
        <p className='price'>{productDetail?.productPrice}</p>
        <p>
          {productDetail?.productDesc
            ? productDetail?.productDesc
            : 'no description'}
        </p>
        <div className='product-color-container'>
          <p>Select Color</p>
          <div>
            <label className='input-container'>
              <input
                type='radio'
                name='product-color'
                className='brown'
                value={selectedColor}
                onChange={() => setSelectedColor('brown')}
              />
              <span className='checkmark' id='brown'></span>
            </label>
            <label className='input-container'>
              <input
                type='radio'
                name='product-color'
                className=''
                value={selectedColor}
                onChange={() => setSelectedColor('blue')}
              />
              <span className='checkmark' id='blue'></span>
            </label>
            <label className='input-container'>
              <input
                type='radio'
                name='product-color'
                className=''
                value={selectedColor}
                onChange={() => setSelectedColor('gray')}
              />
              <span className='checkmark' id='gray'></span>
            </label>
          </div>
        </div>

        <div className='product-size-container'>
          <p>Choose Size</p>
          <div className='size-section'>
            {['Small', 'Medium', 'Large', 'X-Large'].map((size) => (
              <button
                key={size}
                className={`size ${selectedSize === size ? 'selected' : ''}`}
                onClick={() => handleSizeClick(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <div className='product-cart-section'>
          <div className='item-quantity-container'>
            <button
              onClick={() => {
                if (productCount > 1) {
                  setProductCount(productCount - 1);
                }
              }}
            >
              -
            </button>
            <p>{productCount}</p>
            <button onClick={() => setProductCount(productCount + 1)}>+</button>
          </div>
        </div>
          <div className='add-cart-btn-container'>
            <button onClick={handleAddItemToCart}>Add to Cart</button>
          </div>
      </div>

    </div>
      <div className="customer-reviews">
        <CustomerReviews />
      </div>
      </>
  );
};

export default ProductDetail;
