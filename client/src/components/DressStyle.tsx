import "../styles/dressStyle.css";
import frame61 from "../images/Frame 61.png";
import frame62 from "../images/Frame 62.png";
import frame63 from "../images/Frame 63.png";
import frame64 from "../images/Frame 64.png";

const DressStyle = () => {
  return (
    <div className="dress-style-section">
      <div>
        <div className="heading">
          <h1>Browse by Dress Style</h1>
        </div>
        <div className="img-section1">
          <img src={frame61} />
          <img src={frame62} />
        </div>
        <div className="img-section1">
          <img src={frame64} />
          <img src={frame63} />
        </div>
      </div>
    </div>
  );
};

export default DressStyle;
