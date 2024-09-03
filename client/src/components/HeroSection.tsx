import "../styles/heroSection.css";
import heroSectionImg from "../images/hero-section-img.png";
import vectorImg from "../images/vector-img.png";
import vectorImg2 from "../images/vector-img2.png";
import versaceLogo from "../images/versace-logo.png";
import pradaLogo from "../images/prada-logo.png";
import calvinKleinLogo from "../images/calvin-klein-logo.png";
import zaraLogo from "../images/zara-logo.png";
import gucciLogo from "../images/gucci-logo.png";

const HeroSection = () => {
  return (
    <div className="hero-section-container">
      <div className="top-section">
        <div className="left-container">
          <div className="text-section">
            <h1>FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
            <p>
              Browse through our diverse range of meticulously crafted garments,
              desgined to bring out your individuality and cater to your sense
              of style.
            </p>
            <a href="/">Shop Now</a>
          </div>
          <div className="counter-section">
            <div className="counter1">
              <h2>200+</h2>
              <p>International Brands</p>
            </div>
            <div className="counter2">
              <h2>2000+</h2>
              <p>High-Quality Products</p>
            </div>
            <div className="counter3">
              <h2>30,000+</h2>
              <p>Happy Customers</p>
            </div>
          </div>
        </div>
        <div className="right-container">
          <img className="vector-img1" src={vectorImg} />
          <img src={heroSectionImg} />
          <img className="vector-img2" src={vectorImg2} />
        </div>
      </div>
      <div className="bottom-section">
        <img src={versaceLogo} />
        <img src={zaraLogo} />
        <img src={gucciLogo} />
        <img src={pradaLogo} />
        <img src={calvinKleinLogo} />
      </div>
    </div>
  );
};

export default HeroSection;
