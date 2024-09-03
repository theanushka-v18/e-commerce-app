import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Auth from "./pages/Auth";
import ViewAllProducts from "./components/ViewAllProducts";
import { useLocation } from "react-router-dom";
import ShoppingCart from "./pages/ShoppingCart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:auth" element={<Auth />} />
          <Route path="/all-products" element={<ViewAllProductsWrapper />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/product/shopping-cart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<CheckoutWrapper />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

const ViewAllProductsWrapper = () => {
  const location = useLocation();
  const { products, heading } = location.state || { products: [], heading: '' };

  return <ViewAllProducts allProducts={products} heading={heading} />;
};

const CheckoutWrapper = () => {
  const location = useLocation();
  const {cartItems, totalPriceSum} = location.state || {cartItems : [], totalPriceSum : 0};

  return <Checkout cartItems={cartItems} totalPriceSum={totalPriceSum} />
}

export default App;
