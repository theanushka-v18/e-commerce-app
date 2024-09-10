import '../styles/shoppingCart.css';
import CartItems from '../components/CartItems';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Bounce, toast } from 'react-toastify';
// import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const ShoppingCart = () => {
  // const [cartItems, setCartItems] = useState([]);
  const { token, loginStatus } = useAuth();
  const { cartItems, setCartItems } = useCart();

  const navigate = useNavigate();
  const location = useLocation();

  const { selectedSize, selectedColor } = location.state || null;

  async function getCartItems() {
    try {
      const response = await axios.get(
        'http://localhost:5000/products/getCartItems',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            userId: localStorage.getItem('id'),
          },
        }
      );
      setCartItems(response.data);
    } catch (error) {
      console.log('error', error);
    }
  }

  useEffect(() => {
    getCartItems();
  }, []);

  let totalPrice = cartItems?.map((cartItem: any) => {
    let priceString = cartItem?.productPrice;
    let number = parseInt(priceString.replace('$', ''), 10);
    // console.log('cartItems', cartItems);

    return Number(number) * cartItem?.productCount;
  });

  let totalPriceSum = totalPrice?.reduce((acc, price) => {
    return acc + price;
  }, 0);

  function handleCheckout() {
    navigate('/checkout', {
      state: { cartItems, totalPriceSum, selectedColor, selectedSize },
    });
  }

  return (
    <>
      {loginStatus ? (
        <>
          <h1>Your Cart</h1>
          <div className='cart-container'>
            <div className='shopping-cart-container'>
              {cartItems?.map((cartItem) => {
                return (
                  <CartItems
                    cartDetails={cartItem}
                    getCartItems={getCartItems}
                  />
                );
              })}
            </div>
            {cartItems?.length > 0 ? (
              <div className='order-summary'>
                <div className='pricing-section'>
                  <p className='order-summary-heading'>Order Summary</p>
                  <div>
                    <p className='order-summary-label'>Subtotal</p>
                    <p className='order-summary-price'>$ {totalPriceSum}</p>
                  </div>
                  <div>
                    <p className='order-summary-label'>Delivery Fee</p>
                    <p className='order-summary-price'>${Number(15)}</p>
                  </div>
                </div>
                <div className='divider'></div>
                <div className='total-pricing-section'>
                  <div>
                    <p>Total</p>
                    <p className='order-summary-price'>
                      $ {Number(totalPriceSum) + 15}
                    </p>
                  </div>
                  <div>
                    {/* <span className='promo-icon'>
                      <LocalOfferIcon />
                    </span> */}
                    <input type='text' placeholder='Add promo code' />
                    <button className='apply-btn'>Apply</button>
                  </div>
                  <div>
                    <button className='checkout-btn' onClick={handleCheckout}>
                      <span>Go to Checkout</span> <ArrowRightAltIcon />{' '}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p className='cart-message'>Your cart is empty</p>
            )}
          </div>
        </>
      ) : (
        <>
          {/* {
              toast.info('Please login to view your cart', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
                transition: Bounce,
              })
            } */}
          <p className='cart-message'>Please login to view your cart</p>
        </>
      )}
    </>
  );
};

export default ShoppingCart;
