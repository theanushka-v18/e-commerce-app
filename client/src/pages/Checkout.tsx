import { useNavigate } from "react-router-dom";
import CartItems from "../components/CartItems";
// import { ArrowRightAltOutlined } from "@mui/icons-material";
import "../styles/checkout.css";
import { useState } from "react";

interface CheckoutProps {
    cartItems: any[];  
    totalPriceSum: number;
    selectedColor: string,
    selectedSize: string
  }

const Checkout: React.FC<CheckoutProps> = ({ cartItems, totalPriceSum, selectedColor, selectedSize }) => {
    const [address, setAddress] = useState("");
    const navigate = useNavigate();
    
    function navigateToPayment() {
        if(address) {
            navigate('/payment', {state : {totalPriceSum}});
        }
    }
  return (
    <div className="checkout-container">
      <div className="cart-items-checkout">
        {/* <h3>Cart Items ({cartItems.length})</h3> */}
            {
            cartItems?.map((cartItem) => {
                return <CartItems cartDetails={cartItem} checkout={true} selectedColor={selectedColor} selectedSize={selectedSize} />
            })
            }
      </div>
      <div className="order-summary-checkout-container">
      <div className="order-summary-checkout">
      {cartItems.length > 0 ? (
                <div className="order-summary">
                    <div className='pricing-section'>
                        <p className='order-summary-heading'>Order Summary</p>
                        <h3>Cart Items ({cartItems.length})</h3>
                        {
                            cartItems.map((cartItem, idx) => {
                                // console.log('checkout cartItem = ', cartItem);
                                let number = parseInt(cartItem.productPrice.replace('$', ''), 10);
                                return (
                                    <div>
                                        <p key={idx}>{cartItem.productName} ({cartItem.productCount})</p>
                                        <p>${Number(number) * Number(cartItem.productCount)}</p>
                                    </div>
                                )
                            })
                        }
                        <div className="divider"></div>
                        <div>
                            <p className='order-summary-label'>Subtotal</p>
                            <p className='order-summary-price'>$ {totalPriceSum}</p>
                        </div>
                        <div>
                            <p className='order-summary-label'>Delivery Fee</p>
                            <p className='order-summary-price'>${Number(15)}</p>
                        </div>
                        <div className="divider"></div>
                        <div>
                            <p className='order-summary-label'>Total</p>
                            <p className='order-summary-price'>$ {totalPriceSum + Number(15)}</p>
                        </div>
                    </div>
                </div>
              ) : (
                <p>Your cart is empty</p>
              )}
      </div>
      <div className="delivery-details">
        <h3>Deliver to:</h3>
        <input type="text" placeholder="Enter your address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <button onClick={navigateToPayment}>Pay Now</button>
      </div>
      </div>
    </div>
  )
}

export default Checkout
