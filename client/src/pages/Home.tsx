import CustomerReviews from "../components/CustomerReviews";
import DressStyle from "../components/DressStyle";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import ProductSection from "../components/ProductSection";

const Home = () => {
  const headings = ['New Arrivals', 'Top Selling']
  return (
    <>
      {/* <Navbar /> */}
      <HeroSection />
      {/* <ProductSection
        heading="New Arrivals"
      />
      <ProductSection
        heading="Top Selling"
      /> */}
      {headings.map((heading) => {
        return (
          <ProductSection heading={heading} />
        )
      })}
      <DressStyle />
      <CustomerReviews />
      {/* <Footer /> */}
    </>
  );
};

export default Home;
