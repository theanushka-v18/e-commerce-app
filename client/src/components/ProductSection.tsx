import { useEffect, useState } from "react";
import "../styles/productSection.css";
import ProductCard from "./ProductCard";
import axios from "axios";
import { BrowserRouter, Route, Routes, useNavigate, useParams } from "react-router-dom";
import ViewAllProducts from "./ViewAllProducts";
import { useAuth } from "../context/AuthContext";

interface Product {
  imgSrc: string;
  name: string;
  price: number;
  rating: number;
  productCategory: string;
}

interface NewArrivalsProps {
  heading: string;
}

const NewArrivals: React.FC<NewArrivalsProps> = ({ heading }) => {
  const [productsData, setProductsData] = useState<Product[] | null>(null);
  const [newArrivalProducts, setNewArrivalProducts] = useState<Product[] | null>(null);
  const [topSellingProducts, setTopSellingProducts] = useState<Product[] | null>(null);
  const [isViewAll, SetIsViewAll] = useState<boolean>(false);

  // const {productsData, setProductsData} = useAuth();


  const navigate = useNavigate();

  async function getProducts() {
    try {
      const response = await axios.get("https://e-commerce-app-nine-rho.vercel.app/products/getProducts");
      setProductsData(response.data);       
    } catch (error) {
        console.log("error", error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if(productsData) {
      const newArrivalFilteredData = productsData?.filter((product : Product) => {
        return product.productCategory === "New Arrival";
      });
      const topSellingFilteredData = productsData?.filter((product : Product) => {
        return product.productCategory === "Top Selling";
      });
      setNewArrivalProducts(newArrivalFilteredData);
      setTopSellingProducts(topSellingFilteredData);
    }
  }, [productsData]);

  // console.log('productsData', productsData);
  
  
  return (
    // <div className="new-arrivals-section">
    //   <h1>{heading}</h1>
    //   <div className="product-cards">
    //     {newArrivalProducts?.map((product:any) => {
    //       return (
    //         <ProductCard
    //           imgSrc={product.productImage}
    //           cardTitle={product.productName}
    //           price={product.productPrice}
    //           rating={product.productRating}
    //         />
    //       );
    //     })}
    //   </div>
    //   <div className="view-all">
    //     <a href="/">View All</a>
    //   </div>
    // </div>

    <>
      {heading == 'New Arrivals' && (
      <div className="new-arrivals-section">
      <h1>{heading}</h1>
      <div className="product-cards">
        {newArrivalProducts?.map((product:any, idx:any) => {
          return (
            <>
              {idx < 4 ? (
              <ProductCard
                imgSrc={product.productImage}
                cardTitle={product.productName}
                price={product.productPrice}
                rating={product.productRating}
                productId={product._id}
              />
            ) : <></>}
            </>
          );
        })}
      </div>
      <div className="view-all">
        <button onClick={() => {
          getProducts();
          SetIsViewAll(true);
          navigate('/all-products', {
            state: { allProducts: newArrivalProducts, heading: 'New Arrivals' }
          })
        }}><a>View All</a></button>
      </div>
    </div>
    )}

    {heading == 'Top Selling' && (
      <div className="new-arrivals-section">
      <h1>{heading}</h1>
      <div className="product-cards">
        {topSellingProducts?.map((product:any, idx:any) => {
          return (
            <>
              {idx < 4 ? (
              <ProductCard
              imgSrc={product.productImage}
              cardTitle={product.productName}
              price={product.productPrice}
              rating={product.productRating}
              productId={product._id}
            />
            ) : <></>}
            </>
          );
        })}
      </div>
      <div className="view-all">
      <button onClick={() => {
          getProducts();
          SetIsViewAll(true);
          navigate('/all-products', {
            state: { allProducts: topSellingProducts, heading: 'Top Selling' }
          })
        }}><a>View All</a></button>
      </div>
    </div>
    )}
    </>
  );
};

export default NewArrivals;
