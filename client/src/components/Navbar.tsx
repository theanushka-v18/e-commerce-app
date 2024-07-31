import "../styles/navbar.css";
import { useState, MouseEvent, FocusEvent, KeyboardEvent } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MenuIcon from "@mui/icons-material/Menu";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [showInput, setShowInput] = useState<boolean>(false);

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

  return (
    <nav>
      {/* ---------- navbar notification section starts ------------- */}
      <div className="navbar-notification">
        <div>
          <p>
            Sign up and get 20% off to your first order.{" "}
            <a href="/">Sign Up Now</a>
          </p>
          <span className="close">&times;</span>
        </div>
      </div>
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
          <ShoppingCartOutlinedIcon />
          <AccountCircleOutlinedIcon />
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
          <AccountCircleOutlinedIcon />
        </div>
      </div>
      {/* -------------- hamburger menu section ends ------------ */}
      {/* ------------- navbar container section ends ------------  */}
    </nav>
  );
};

export default Navbar;
