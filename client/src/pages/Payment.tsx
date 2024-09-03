import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useCart } from "../context/CartContext";

const Payment = () => {
    const location = useLocation();
    const {totalPriceSum} = location.state || 0;
    // const [paymentSuccessful, setPaymentSuccessful] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();    
    const {setOrderHistory, cartItems, orderHistory} = useCart();
    const {paymentSuccessfull, setPaymentSuccessfull} = useAuth();

    async function handlePayment() {
        // Payment logic here
        try {
          const response = await axios.put(`https://e-commerce-app-nine-rho.vercel.app/auth/payment`, {
            amount : Number(totalPriceSum) + 15
          },
          { params : {
            id : localStorage.getItem("id")
          }})

          if (response.status === 200) {
            setOrderHistory((prevOrderHistory) => [...prevOrderHistory, ...cartItems]);
            console.log('before order history', cartItems);
            
            // create an order
            const orderResponse = await axios.post('https://e-commerce-app-nine-rho.vercel.app/products/createOrder', {
                userId: localStorage.getItem("id"),
                items: cartItems,
                totalPrice: Number(totalPriceSum) + 15
            });

            // Add the order to the user's order history
            await axios.put(`https://e-commerce-app-nine-rho.vercel.app/products/updateOrderHistory`, {
              userId: localStorage.getItem("id"),
              orderId: orderResponse.data._id
          });

          await axios.delete('https://e-commerce-app-nine-rho.vercel.app/products/deleteAllCartItems', {
            params: {
              userId: localStorage.getItem("id")
            }
          });
    
          // setOrderHistory((prevOrderHistory) => [...prevOrderHistory, ...cartItems]);

            console.log(cartItems);
    
            setPaymentSuccessfull(true);
            localStorage.setItem("amount", response.data.amount);
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {  // Check if error is an AxiosError
            if (error.response && error.response.status === 400) {
              setErrorMessage("Insufficient amount to make this purchase.");
            } else {
              console.log('error', error);
              setErrorMessage("An error occurred while processing your payment.");
            }
          } else {
            console.log('error', error);
            setErrorMessage("An unexpected error occurred.");
          }
        }
    }

  return (
    <div className="payment-container">
      <div className="payment-box">
        <h4>Payment Section</h4>
        {!paymentSuccessfull ? (
            <>
              <p className="total-price">${Number(totalPriceSum) + Number(15)}</p>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </>
        ) : (
            <p>Payment Successful! ✔</p>
        )}
        {!paymentSuccessfull ? (
            <button onClick={handlePayment}>Pay</button>
        ) : (
            <button onClick={() => navigate('/')}>Go to Home</button>
        )}
      </div>
    </div>
  )
}

export default Payment
