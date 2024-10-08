import "../styles/productSection.css";
import Rating from "@mui/material/Rating";
import Stack from '@mui/material/Stack';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProductCard = (props:any) => {
  const navigate = useNavigate();
  const {productDetail, setProductDetail} = useAuth();
  // console.log('props', props);
  

  async function handleGetProductDetail() {
    try {
      const response = await axios.get(`http://localhost:5000/products/getProductById/${props.productId}`);
      // console.log('response', response.data);
      
      setProductDetail(response.data);
      navigate(`/product/${response.data._id}`);
    } catch(error) {
      console.log('error', error);
    }
  }

  const rating = props.rating ?? 0;

  console.log('props', props);
  

  return (
    <div className='product-card' onClick={handleGetProductDetail}>
      <div className="card-img-section">
        <img src={props.imgSrc} />
      </div>
      <div className="card-bottom-section">
        <p>{props.cardTitle}</p>
        <Stack spacing={1}>
            <span>
                <Rating name="half-rating-read" size="small" defaultValue={rating} precision={0.5} readOnly /> <span className="rating">{rating?.toFixed(1)}/5</span>
            </span>
        </Stack>
        <p className="price">{props.price}</p>
      </div>
    </div>
  )
}

export default ProductCard
