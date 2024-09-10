import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../context/CartContext';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';

const CartItems = (props:any) => {
    // console.log(props);
    const {productCount, setProductCount} = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    
  if(!props?.profile) {
    const {selectedSize} = location?.state || null;
  }
    // console.log('product detail', props.cartDetails._id);

   async function handleRemoveCartItem(e:any) {
    e.preventDefault();
      try {
        const response = await axios.delete(`http://localhost:5000/products/removeCartItem/${props.cartDetails._id}`, {
          params : {
            userId : localStorage.getItem("id")
          }
        });
        navigate('/');
        toast.success('Product deleted from the cart successfully', {
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
      } catch(error:any) {
        toast.error(error.response.data, {
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
      // console.log('remove cart item', props.cartDetails._id);
      // console.log(e);
      
    }

    async function handleUpdateProductCount(e:any) {
      try {
        let updatedCount = productCount;

        if (e.target.innerText === '+') {
            updatedCount = productCount + 1;
            setProductCount(updatedCount);
        } else if (e.target.innerText === '-' && productCount > 1) {
            updatedCount = productCount - 1;
            setProductCount(updatedCount);
        }

        if (updatedCount !== productCount) {
            // console.log('updated product count', updatedCount);
            const response = await axios.put(`http://localhost:5000/products/updateProductCount/${props.cartDetails._id}`, {
              productCount: updatedCount,
            }, { params: { userId: localStorage.getItem("id") } });
            props.getCartItems();
            // console.log('API response:', response.data);
        }
        
      } catch(error) {
        console.log('error', error);
      }
    }    

    console.log('cartDetails',  props.cartDetails);

    
    
  return (
    <div className="cart-items-container">
      <div className="product-image">
        <img src={props?.cartDetails?.productImage} alt="product image" />
      </div>
      <div className="product-details">
        <div id="product-title-section">
            <p className='product-title'>{props?.cartDetails?.productName}</p>
            {!props?.checkout && (
              <span onClick={(e) => handleRemoveCartItem(e)}>
                <DeleteIcon />
              </span>
            )}
        </div>
        <p>Size: <span>{props?.cartDetails?.productSize}</span></p>
        <p>Color: <span>{props?.cartDetails?.productColor}</span></p>
          <div className="price-count-container">
          <p className="price">{props?.cartDetails?.productPrice}</p>
        {!props?.checkout ? (
          <div className="item-quantity-container">
            <button onClick={(e) => handleUpdateProductCount(e)}>-</button>
            <p>{props?.cartDetails?.productCount}</p>
            <button onClick={(e) => handleUpdateProductCount(e)}>+</button>
          </div>
        ) : (
          <h4>Quantity: {props?.cartDetails?.productCount}</h4>
        )}
          </div>
      </div>
    </div>
  )
}

export default CartItems;
