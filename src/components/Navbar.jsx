import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; 
import MenuIcon from "@mui/icons-material/Menu"; 
import CloseIcon from "@mui/icons-material/Close";
import "../styling/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { isAuthenticated } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleCartClick = () => {
    if (isAuthenticated) {
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };

  const handleWishlistClick = () => {
    if (isAuthenticated) {
      navigate("/wishlist");
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="navbar">
      <nav className="nav-container">
        <div className="nav-left">
          <img
            src="/Logo.svg"
            alt="Logo"
            className="nav-logo"
            onClick={() => navigate("/")}
          />
        </div>
        <div className="nav-links">
          <button onClick={() => navigate("/")} className="nav-link btn-nav">
            Home
          </button>
          <button
            onClick={() => navigate("/shop")}
            className="nav-link btn-nav"
          >
            Shop
          </button>
          <button
            onClick={() => navigate("/about")}
            className="nav-link btn-nav"
          >
            About us
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="nav-link btn-nav"
          >
            Contact
          </button>
          {/* <button
            onClick={() => navigate("/orders")}
            className="nav-link btn-nav"
          >
            Order
          </button> */}
          {/* <button
            onClick={() => navigate("/profile")}
            className="nav-link btn-nav"
          >
            profile
          </button> */}
        </div>
        <div className="nav-right">
          <button onClick={handleWishlistClick} name="wishlist"  className="wishlist-button icon-button-no-bg">
            <FavoriteBorderIcon fontSize="large" />
          </button>

          <button onClick={handleCartClick} className="cart-button btn-nav icon-button-no-bg">
            <Badge badgeContent={cartCount} color="error" overlap="rectangular" name="cart-badge">
              <ShoppingCartIcon fontSize="large" />
            </Badge>
          </button>

          <button
            onClick={() => {
              if (isAuthenticated) {
                navigate("/profile");
              } else {
                navigate("/login");
              }
            }}
            className="profile-button btn-nav icon-button-no-bg"
            name="profile-button"
          >
            <AccountCircleIcon fontSize="large" />
          </button>

          {/* Mobile toggle */} 
          <button
            className="nav-toggle btn-nav icon-button-no-bg"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <MenuIcon fontSize="large" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`nav-menu ${menuOpen ? "show-menu" : ""}`}>
        <button
          onClick={() => setMenuOpen(false)}
          className="nav-close btn-nav icon-button-no-bg"
          aria-label="Close menu"
        >
          <CloseIcon fontSize="large" />
        </button>

        <button
          onClick={() => {
            navigate("/");
            setMenuOpen(false);
          }}
          className="nav-link btn-nav"
        >
          Home
        </button>
        <button
          onClick={() => {
            navigate("/shop");
            setMenuOpen(false);
          }}
          className="nav-link btn-nav"
        >
          Shop
        </button>
        <button
          onClick={() => {
            navigate("/about");
            setMenuOpen(false);
          }}
          className="nav-link btn-nav"
        >
          About us
        </button>
        <button
          onClick={() => {
            navigate("/contact");
            setMenuOpen(false);
          }}
          className="nav-link btn-nav"
        >
          Contact
        </button>
      </div>
    </header>
  );
};

export default Navbar;

