import "../styles/dressStyle.css";
import frame61 from "../images/Frame 61.png";
import frame62 from "../images/Frame 62.png";
import frame63 from "../images/Frame 63.png";
import frame64 from "../images/Frame 64.png";

const DressStyle = () => {
  return (
    <div className="dress-style-section">
      <div className="dress-style-container">
        <div className="heading">
          <h1>Browse by Dress Style</h1>
        </div>
        <div className="img-section1">
          <img src={frame61} id="odd-place1" />
          <img src={frame62} id="even-place1"/>
        </div>
        <div className="img-section1">
          <img src={frame64} id="odd-place2" />
          <img src={frame63} id="even-place2" />
        </div>
      </div>
    </div>
  );
};

export default DressStyle;
