import "../styles/navbar.css";
import {
  useState,
  MouseEvent,
  FocusEvent,
  KeyboardEvent,
} from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { loginStatus, setUserData, setIsAdmin, setLoginStatus, token } = useAuth();
  const {selectedSize} = useCart();
  const [open, setOpen] = useState<boolean>(false);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [isVisible, setIsvisible] = useState<boolean>(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const openAccount = (!loginStatus && Boolean(anchorEl));
  const handleClick = async (event:any) => {
    if(loginStatus) {
      try {
        const response = await axios.get("https://e-commerce-app-nine-rho.vercel.app/auth/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const allOrders = await axios.get("https://e-commerce-app-nine-rho.vercel.app/products/getOrderHistory", {
          params : {userId : localStorage.getItem("id")}
        })
        // console.log('allOrders', allOrders);
        
        setUserData(response.data)
        navigate("/profile", {state : { userData: response.data, allOrders: allOrders.data }});
      } catch (error) {
        console.log("Cannot get user profile", error);
      }
    }
    setAnchorEl(event.currentTarget);
  };

  const toggleDrawer = (newOpen: boolean) => (event: MouseEvent) => {
    setOpen(newOpen);
  };

  const showSearchInput = (ShowSearch: boolean) => (event: MouseEvent) => {
    setShowInput(ShowSearch);
  };

  const handleSearchInput = (
    event: FocusEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.type === "blur") {
      setShowInput(false);
    } else if (
      event.type === "keydown" &&
      (event as KeyboardEvent).key === "Enter"
    ) {
      setShowInput(false);
    }
  };

  async function getUserProfile(event:any) {
    if(event.target.innerText == "User") {
      localStorage.setItem('isAdmin', 'false');
      setIsAdmin(false);
    } else {
      localStorage.setItem('isAdmin', 'true');
      setIsAdmin(true);
    }
    
    setAnchorEl(null);
      if (!loginStatus) {
        navigate("/register");
      } else {
        try {
          const response = await axios.get("https://e-commerce-app-nine-rho.vercel.app/auth/profile", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          // console.log(response.data);
          setUserData(response.data)
          navigate("/profile", {state : response.data});
        } catch (error) {
          console.log("Cannot get user profile", error);
        }
    }
  } 

  async function getCartItems() {
    try {
        const response = await axios.get('https://e-commerce-app-nine-rho.vercel.app/products/getCartItems', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params : {
            userId : localStorage.getItem("id")
          }
        });
        // console.log('getCartItems = ', response.data);
        navigate('/product/shopping-cart', {state : {selectedSize}});
      
      
    } catch (error) {
      console.log('error', error);
      
    }
  }

  return (
    <nav>
      {/* ---------- navbar notification section starts ------------- */}
      {isVisible && (
        <div className="navbar-notification">
          <div>
            <p>
              Sign up and get 20% off to your first order.{" "}
              <a href="/register">Sign Up Now</a>
            </p>
            <span className="close" onClick={() => setIsvisible(false)}>
              &times;
            </span>
          </div>
        </div>
      )}
      {/* ---------- navbar notification section ends ------------- */}

      {/* ------------- navbar container section starts ------------  */}
      <div className="navbar-container">
        <h2>SHOP.CO</h2>
        <div className="menu-links">
          <ul>
            <li>
              <a href="/">Shop</a>
            </li>
            <li>
              <a href="/">On Sale</a>
            </li>
            <li>
              <a href="/">New Arrivals</a>
            </li>
            <li>
              <a href="/">Brands</a>
            </li>
          </ul>
        </div>
        <div className="navbar-input">
          <span className="search-icon">
            <SearchOutlinedIcon />
          </span>
          <input type="text" placeholder="Search for products..." />
        </div>
        <div className="navbar-icons">
        <button onClick={getCartItems}>
          <ShoppingCartOutlinedIcon />
        </button>

          <button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <AccountCircleOutlinedIcon />
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openAccount}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={(event) => getUserProfile(event)}>User</MenuItem>
        <MenuItem onClick={(event) => getUserProfile(event)}>Admin</MenuItem>
      </Menu>
        </div>
      </div>

      {/* -------------- hamburger menu section starts ------------ */}
      <div className="navbar-small-devices">
        <div>
          <div className="hamburger-menu-container">
            <Button className="hamburger-menu-btn" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </Button>
            <Drawer className="hamburger-menu-drawer" open={open}>
              <div
                className="close-hamburger-menu"
                onClick={toggleDrawer(false)}
              >
                &times;
              </div>
              <Box sx={{ width: 250 }} role="presentation">
                <List>
                  {["Shop", "On Sale", "New Arrivals", "Brands"].map(
                    (text, index) => (
                      <ListItem className="listItem" key={text} disablePadding>
                        <ListItemButton>
                          <ListItemText primary={text} />
                        </ListItemButton>
                      </ListItem>
                    )
                  )}
                </List>
              </Box>
            </Drawer>
          </div>
          <h2>SHOP.CO</h2>
        </div>
        <div className="navbar-icons">
          {showInput ? (
            <div className="search-input">
              <span className="search-icon">
                <SearchOutlinedIcon />
              </span>
              <input
                type="text"
                placeholder="Search for products..."
                onBlur={handleSearchInput}
                onKeyDown={handleSearchInput}
              />
            </div>
          ) : (
            <SearchOutlinedIcon onClick={showSearchInput(true)} />
          )}
          <ShoppingCartOutlinedIcon />
          {/* <AccountCircleOutlinedIcon
            onClick={getUserProfile}
          /> */}
          
        </div>
      </div>
      {/* -------------- hamburger menu section ends ------------ */}
      {/* ------------- navbar container section ends ------------  */}
    </nav>
  );
};

export default Navbar;
