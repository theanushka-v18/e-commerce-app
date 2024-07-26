import '../styles/navbar.css';  
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const Navbar = () => {
  return (
    <nav>
      {/* ---------- navbar notification section starts ------------- */}
      <div className='navbar-notification'>
        <div>
          <p>Sign up and get 20% off to your first order. <a href='/'>Sign Up Now</a></p>
          <span className='close'>&times;</span>
        </div>
      </div>
      {/* ---------- navbar notification section ends ------------- */}

      {/* ------------- navbar container section starts ------------  */}
      <div className='navbar-container'>
        <h2>SHOP.CO</h2>
        <div className='menu-links'>
          <ul>
            <li><a href='/'>Shop</a></li>
            <li><a href='/'>On Sale</a></li>
            <li><a href='/'>New Arrivals</a></li>
            <li><a href='/'>Brands</a></li>
          </ul>
        </div>
        <div className='navbar-input'>
          <span className='search-icon'><SearchOutlinedIcon /></span>
          <input type='text' placeholder='Search for products...' />
        </div>
        <div className='navbar-icons'>
          <ShoppingCartOutlinedIcon />
          <AccountCircleOutlinedIcon />
        </div>
      </div>
      {/* ------------- navbar container section ends ------------  */}
    </nav>
  )
}

export default Navbar
