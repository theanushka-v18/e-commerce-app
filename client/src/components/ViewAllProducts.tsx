import { useLocation } from 'react-router-dom';
import ProductCard from './ProductCard';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

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
  const [filteredData, setFilteredData] = useState<Product[] | null>(null);
  const location = useLocation();
  const { heading, allProducts } = location.state || {
    products: [],
    heading: '',
  };

  const { searchQuery } = useAuth();
  // let filteredData = null;

  useEffect(() => {
    const filtered = allProducts?.filter((product: any) => {
      return product?.productName.toLowerCase().includes(searchQuery.toLowerCase());
    }) || null;

    setFilteredData(filtered);
    console.log('filtered data', filtered);
  }, [searchQuery, allProducts]);

  return (
    <div className='new-arrivals-section'>
      <h1>{heading}</h1>
      <div className='product-cards'>
        {!searchQuery &&
          allProducts?.map((product: any) => {
            return (
              <ProductCard
                imgSrc={product.productImage}
                cardTitle={product.productName}
                price={product.productPrice}
                rating={product.productRating}
                productId={product._id}
              />
            );
          })}

          {(searchQuery && filteredData) && filteredData?.map((product: any) => {
            return (
              <ProductCard
                imgSrc={product.productImage}
                cardTitle={product.productName}
                price={product.productPrice}
                rating={product.productRating}
                productId={product._id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ViewAllProducts;
