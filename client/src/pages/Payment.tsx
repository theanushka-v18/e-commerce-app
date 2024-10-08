import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { Bounce, toast } from "react-toastify";

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
          const response = await axios.put(`http://localhost:5000/auth/payment`, {
            amount : Number(totalPriceSum) + 15
          },
          { params : {
            id : localStorage.getItem("id")
          }})

          if (response.status === 200) {
            setOrderHistory((prevOrderHistory) => [...prevOrderHistory, ...cartItems]);
            // console.log('before order history', cartItems);
            
            // create an order
            const orderResponse = await axios.post('http://localhost:5000/products/createOrder', {
                userId: localStorage.getItem("id"),
                items: cartItems,
                totalPrice: Number(totalPriceSum) + 15
            });

            // Add the order to the user's order history
            await axios.put(`http://localhost:5000/products/updateOrderHistory`, {
              userId: localStorage.getItem("id"),
              orderId: orderResponse.data._id
          });

          await axios.delete('http://localhost:5000/products/deleteAllCartItems', {
            params: {
              userId: localStorage.getItem("id")
            }
          });
    
          // setOrderHistory((prevOrderHistory) => [...prevOrderHistory, ...cartItems]);

            // console.log(cartItems);
    
            setPaymentSuccessfull(true);
            toast.success('Payment Successfull', {
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
            localStorage.setItem("amount", response.data.amount);
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {  // Check if error is an AxiosError
            if (error.response && error.response.status === 400) {
              setErrorMessage("Insufficient amount to make this purchase.");
              toast.error('Insufficient amount to make this purchase.', {
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
            } else {
              // console.log('error', error);
              setErrorMessage("An error occurred while processing your payment.");
              toast.error('An error occurred while processing your payment.', {
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
          } else {
            // console.log('error', error);
            setErrorMessage("An unexpected error occurred.");
            toast.error('An unexpected error occurred.', {
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
