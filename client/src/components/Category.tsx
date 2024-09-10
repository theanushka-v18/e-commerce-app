import { useAuth } from '../context/AuthContext';
import ProductCard from './ProductCard';
import '../styles/category.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import TuneIcon from '@mui/icons-material/Tune';
import PriceSlider from './PriceSlider';
import { useCart } from '../context/CartContext';

interface Product {
  imgSrc: string;
  name: string;
  price: number;
  rating: number;
  productCategory: string;
  size?: string;  // Add size if it's part of the product data
  color?: string; // Add color if it's part of the product data
}

const Category = () => {
  const { productsData, setProductsData, searchQuery } = useAuth();
  const [filteredData, setFilteredData] = useState<Product[] | null>(null);
  // const [categoryFilteredData, setCategoryFilteredData] = useState(null);
  const [priceRange, setPriceRange] = useState([50, 200]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const location = useLocation();

  const { category } = location.state || null;

  async function getProducts() {
    try {
      const response = await axios.get(
        'http://localhost:5000/products/getProducts'
      );
      setProductsData(response.data);
    } catch (error) {
      console.log('error', error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const filtered =
      productsData
        ?.filter((product: any) => {
          return product?.productName
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        })
        .map((product: any) => ({
          imgSrc: product.productImage,
          name: product.productName,
          price: product.productPrice,
          rating: product.productRating,
          productCategory: product.productCategory,
        })) || null;

    setFilteredData(filtered);
    // console.log('filtered data', filtered);
  }, [searchQuery, productsData]);

  const handlePriceChange = (range: any) => {
    const filtered = productsData?.filter((product: any) => {
      
      return true;
    }).map((product: any) => ({
      imgSrc: product.productImage,
      name: product.productName,
      price: product.productPrice,
      rating: product.productRating,
      productCategory: product.productCategory,
    }));
  
    setFilteredData(filtered || null); 
    setPriceRange(range);
    // console.log('Selected price range:', range);
  };

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
  };

  function handleApplyFilter() {

    const filtered = productsData?.filter((product: any) => {
      const price = Number(product?.productPrice.match(/\d+/)[0]);
      
      return price >= Number(priceRange[0]) && price <= Number(priceRange[1]);
    }).map((product: any) => ({
      imgSrc: product.productImage,
      name: product.productName,
      price: product.productPrice,
      rating: product.productRating,
      productCategory: product.productCategory,
    }));
  
    setFilteredData(filtered || null);   
  }

  return (
    <div className='category-container'>
      <div className='filter-container'>
        <div className='filter-heading'>
          <h3>Filters</h3>
          <TuneIcon />
        </div>
        <div className='divider'></div>
        <div className='filter-price'>
          <h3>Price</h3>
          <PriceSlider min={50} max={200} onChange={handlePriceChange} />
        </div>
        <div className='divider'></div>
        <div className='filter-size'>
          <h3>Size</h3>
          <div className='size-spans'>
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
          <div className='divider'></div>
          <div className='filter-color'>
            <h3>Color</h3>
            <div className='product-color-container'>
              <div>
                <label className='input-container'>
                  <input type='radio' name='product-color' className='brown' value={selectedColor} onChange={() => setSelectedColor("brown")} />
                  <span className='checkmark' id='brown'></span>
                </label>
                <label className='input-container'>
                  <input type='radio' name='product-color' className='' value={selectedColor} onChange={() => setSelectedColor("blue")} />
                  <span className='checkmark' id='blue'></span>
                </label>
                <label className='input-container'>
                  <input type='radio' name='product-color' className='' value={selectedColor} onChange={() => setSelectedColor("gray")} />
                  <span className='checkmark' id='gray'></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className='apply-button'>
          <div className='divider'></div>
          <button onClick={handleApplyFilter}>Apply Filter</button>
        </div>
      </div>
      <div className='products-container'>
        <h2>{category}</h2>
        <div className='product-cards'>
          {!searchQuery && (priceRange[0]==50 && priceRange[1]==200) &&
            productsData?.map((product: any) => {
              return (
                <ProductCard
                  imgSrc={product?.productImage}
                  cardTitle={product?.productName}
                  price={product?.productPrice || 0}
                  rating={product?.productRating}
                  productId={product?._id}
                />
              );
            })}

          {searchQuery &&
            filteredData &&
            filteredData?.map((product: any) => {
              return (
                <ProductCard
                  imgSrc={product?.imgSrc}
                  cardTitle={product?.name}
                  price={product?.price}
                  rating={product?.rating}
                  productId={product?._id}
                />
              );
            })}

          {!searchQuery && (priceRange[0]>50 || priceRange[1]<200) &&
            filteredData &&
            filteredData?.map((product: any) => {
              return (
                <ProductCard
                  imgSrc={product?.imgSrc}
                  cardTitle={product?.name}
                  price={product?.price}
                  rating={product?.rating}
                  productId={product?._id}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Category;
