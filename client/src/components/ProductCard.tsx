import "../styles/productSection.css";
import Rating from "@mui/material/Rating";
import Stack from '@mui/material/Stack';

const ProductCard = (props:any) => {
  return (
    <div className='product-card'>
      <div className="card-img-section">
        <img src={props.imgSrc} />
      </div>
      <div className="card-bottom-section">
        <p>{props.cardTitle}</p>
        <Stack spacing={1}>
            <span>
                <Rating name="half-rating-read" size="small" defaultValue={props.rating} precision={0.5} readOnly /> <span className="rating">{props.rating}/5</span>
            </span>
        </Stack>
        <p className="price">{props.price}</p>
      </div>
    </div>
  )
}

export default ProductCard
