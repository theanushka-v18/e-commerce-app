import "../styles/footer.css";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import visaLogo from '../images/visa-logo.png';
import mastercardLogo from '../images/mastercard-logo.png';
import applePayLogo from '../images/applePay-logo.png';
import gpayLogo from '../images/gpay-logo.png';
import paypalLogo from '../images/paypal-logo.png'

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="top-section-container">
        <div className="top-section-footer">
          <div className="text-section-footer">
            <h2>Stay upto date about our latest offers</h2>
          </div>
          <div className="button-section">
            <div>
              <span className="email-icon">
                <EmailOutlinedIcon />
              </span>
              <input type="email" placeholder="Enter your email address" />
            </div>
            <a href="/">Subscribe to NewsLetter</a>
          </div>
        </div>
      </div>
      <div className="main-footer">
        <div className="main-footer-top">
          <div className="left">
            <h2>Shop.co</h2>
            <p>
              We have clothes that suits your style and which you're proud to
              wear. From women to men.
            </p>
            <div className="social-media-icons">
              <span>
                <TwitterIcon />
              </span>
              <span>
                <FacebookRoundedIcon />
              </span>
              <span>
                <InstagramIcon />
              </span>
              <span>
                <GitHubIcon />
              </span>
            </div>
          </div>
          <div className="right">
            <div>
              <p>company</p>
              <ul>
                <li><a href="/">About</a></li>
                <li><a href="/">Features</a></li>
                <li><a href="/">Works</a></li>
                <li><a href="/">Careers</a></li>
              </ul>
            </div>
            <div>
              <p>help</p>
              <ul>
                <li><a href="/">Customer Support</a></li>
                <li><a href="/">Delivery Details</a></li>
                <li><a href="/">Terms & Conditions</a></li>
                <li><a href="/">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <p>faq</p>
              <ul>
                <li><a href="/">Account</a></li>
                <li><a href="/">Manage Deliveries</a></li>
                <li><a href="/">Orders</a></li>
                <li><a href="/">Payments</a></li>
              </ul>
            </div>
            <div>
              <p>resources</p>
              <ul>
                <li><a href="/">Free eBooks</a></li>
                <li><a href="/">Development Tutorial</a></li>
                <li><a href="/">How to - Blog</a></li>
                <li><a href="/">Youtube Playlist</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="main-footer-bottom">
            <div>
                <p>Shop.co &copy; 2000-2023, All Rights Reserved</p>
            </div>
            <div className="payment-options">
                <img src={visaLogo} alt="" />
                <img src={mastercardLogo} alt="" />
                <img src={paypalLogo} alt="" />
                <img src={applePayLogo} alt="" />
                <img src={gpayLogo} alt="" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
