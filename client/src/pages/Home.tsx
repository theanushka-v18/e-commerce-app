import DressStyle from "../components/DressStyle";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import ProductSection from "../components/ProductSection";
import frame32 from "../images/Frame 32.png";
import frame33 from "../images/Frame 33.png";
import frame34 from "../images/Frame 34.png";
import frame35 from "../images/Frame 35.png";
import frame36 from "../images/Frame 36.png";
import frame37 from "../images/Frame 37.png";
import frame38 from "../images/Frame 38.png";
import frame39 from "../images/Frame 39.png";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <ProductSection
        heading="New Arrivals"
        frame32={frame32}
        frame33={frame33}
        frame34={frame34}
        frame35={frame35}
        cardTitle1='T-shirt with Tape Details'
        cardTitle2='Skinny Fit Jeans'
        cardTitle3='Skinny Fit Jeans'
        cardTitle4='Skinny Fit Jeans'
        price1='$120'
        price2='$240'
        price3='$180'
        price4='$130'
        rating1='4.5'
        rating2='3.5'
        rating3='4.5'
        rating4='4.5'
      />
      <ProductSection
        heading="Top Selling"
        frame32={frame36}
        frame33={frame37}
        frame34={frame38}
        frame35={frame39}
        cardTitle1='Vertical Striped Shirt'
        cardTitle2='Courage Graphic T-shirt'
        cardTitle3='Loose Fit Bermuda Shorts'
        cardTitle4='Faded Skinny Jeans'
        price1='$212'
        price2='$145'
        price3='$80'
        price4='$210'
        rating1='5.0'
        rating2='4.0'
        rating3='3.0'
        rating4='4.5'
      />
      <DressStyle />
      <Footer />
    </div>
  );
};

export default Home;
