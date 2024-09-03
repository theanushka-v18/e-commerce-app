import { useLocation } from "react-router-dom";
import ProductCard from "./ProductCard";

interface Product {
    imgSrc: string;
    name: string;
    price: number;
    rating: number;
    productCategory: string;
  }
  
  interface ViewAllProductsProps {
    heading: string;
    allProducts: Product[] | null; // Define allProducts as an array of Product objects
  }

const ViewAllProducts: React.FC<ViewAllProductsProps> = () => {
    const location = useLocation();
    const {heading, allProducts} = location.state || {products: [], heading: ''};
  return (
    <div className="new-arrivals-section">
      <h1>{heading}</h1>
      <div className="product-cards">
        {allProducts?.map((product:any) => {
          return (
              <ProductCard
                imgSrc={product.productImage}
                cardTitle={product.productName}
                price={product.productPrice}
                rating={product.productRating}
            />
          );
        })}
      </div>
      </div>
  )
}

export default ViewAllProducts
