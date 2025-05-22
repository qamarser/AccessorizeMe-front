// // import React, { useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom';
// // import { FaShoppingCart, FaUserCircle, FaBars, FaTimes, FaHeart, FaUser, FaSignOutAlt } from 'react-icons/fa';

// // const Navbar = () => {
// //   const [dropdownOpen, setDropdownOpen] = useState(false);
// //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// //   const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

// //   useEffect(() => {
// //     const handleResize = () => {
// //       setIsDesktop(window.innerWidth >= 1024);
// //       if (window.innerWidth >= 1024) {
// //         setMobileMenuOpen(false);
// //         setDropdownOpen(false);
// //       }
// //     };
// //     window.addEventListener('resize', handleResize);
// //     return () => window.removeEventListener('resize', handleResize);
// //   }, []);

// //   const toggleDropdown = () => {
// //     if (isDesktop) {
// //       setDropdownOpen(!dropdownOpen);
// //     }
// //   };

// //   const closeDropdown = () => {
// //     setDropdownOpen(false);
// //   };

// //   const toggleMobileMenu = () => {
// //     setMobileMenuOpen(!mobileMenuOpen);
// //   };

// //   const closeMobileMenu = () => {
// //     setMobileMenuOpen(false);
// //     closeDropdown();
// //   };

// //   return (
// //     <nav className="bg-[#63ACFF]/[.77] flex items-center justify-between px-6 py-3 relative w-full">
// //       {/* Logo */}
// //       <div className="flex-shrink-0">
// //         <Link to="/" onClick={closeMobileMenu}>
// //           <img src="/Logo.svg" alt="Logo" className="h-10" />
// //         </Link>
// //       </div>

// //       {/* Hamburger menu button for mobile only */}
// //       {!isDesktop && (
// //         <button
// //           className="text-[#434153]"
// //           onClick={toggleMobileMenu}
// //           aria-label="Toggle menu"
// //         >
// //           {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
// //         </button>
// //       )}

// //       {/* Nav links */}
// //       <ul
// //         className={`lg:flex lg:items-center lg:space-x-8 absolute lg:static top-full left-0 w-full lg:w-auto bg-[#63ACFF]/[.77] lg:bg-transparent transition-all duration-300 ease-in-out ${
// //           mobileMenuOpen ? 'block' : 'hidden'
// //         } lg:block`}
// //       >
// //         <li>
// //           <Link
// //             to="/"
// //             onClick={closeMobileMenu}
// //             className="block px-4 py-2 text-black hover:underline"
// //           >
// //             Home
// //           </Link>
// //         </li>
// //           <li>
// //             <Link
// //               to="/shop"
// //               onClick={closeMobileMenu}
// //               className="block px-4 py-2 text-black hover:underline"
// //             >
// //               Shop
// //             </Link>
// //           </li>
// //           <li>
// //             <Link
// //               to="/aboutus"
// //               onClick={closeMobileMenu}
// //               className="block px-4 py-2 text-black hover:underline"
// //             >
// //               About Us
// //             </Link>
// //           </li>
// //         <li>
// //           <Link
// //             to="/contact"
// //             onClick={closeMobileMenu}
// //             className="block px-4 py-2 text-black hover:underline"
// //           >
// //             Contact
// //           </Link>
// //         </li>

// //         {/* Profile, Wishlist, Logout links for mobile menu */}
// //         {!isDesktop && (
// //           <>
// //             <li>
// //               <Link
// //                 to="/profile"
// //                 onClick={closeMobileMenu}
// //                 className="flex items-center px-4 py-2 text-black hover:underline"
// //               >
// //                 <FaUser className="mr-2 text-[#434153]" />
// //                 Profile
// //               </Link>
// //             </li>
// //             <li>
// //               <Link
// //                 to="/wishlist"
// //                 onClick={closeMobileMenu}
// //                 className="flex items-center px-4 py-2 text-black hover:underline"
// //               >
// //                 <FaHeart className="mr-2 text-[#434153]" />
// //                 Wishlist
// //               </Link>
// //             </li>
// //             <li>
// //               <Link
// //                 to="/logout"
// //                 onClick={closeMobileMenu}
// //                 className="flex items-center px-4 py-2 text-black hover:underline"
// //               >
// //                 <FaSignOutAlt className="mr-2 text-[#434153]" />
// //                 Logout
// //               </Link>
// //             </li>
// //           </>
// //         )}
// //       </ul>

// //       {/* Search bar */}
// //       <div className="flex items-center space-x-4 ml-4 flex-grow max-w-[239px]">
// //         <input
// //           type="text"
// //           placeholder="Search..."
// //           aria-label="Search"
// //           className="w-full px-3 py-1 rounded bg-white text-black focus:outline-none"
// //         />
// //       </div>

// //       {/* Cart and Avatar */}
// //       <div className="flex items-center space-x-6 ml-4">
// //         <Link to="/cart" aria-label="Cart" className="text-[#434153]">
// //           <FaShoppingCart size={24} />
// //         </Link>

// //         <div
// //           className="relative"
// //           onMouseEnter={() => isDesktop && setDropdownOpen(true)}
// //           onMouseLeave={() => isDesktop && setDropdownOpen(false)}
// //           tabIndex={0}
// //           aria-haspopup="true"
// //           aria-expanded={dropdownOpen}
// //         >
// //           <FaUserCircle size={32} className="text-[#434153] cursor-pointer" />
// //           {/* Dropdown only on desktop */}
// //           {dropdownOpen && (
// //             <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-10 max-w-[calc(100vw-1rem)] overflow-auto">
// //               <Link
// //                 to="/profile"
// //                 className="flex items-center px-4 py-2 text-black hover:bg-gray-100"
// //                 onClick={closeMobileMenu}
// //               >
// //                 <FaUser className="mr-2 text-[#434153]" />
// //                 Profile
// //               </Link>
// //               <Link
// //                 to="/wishlist"
// //                 className="flex items-center px-4 py-2 text-black hover:bg-gray-100"
// //                 onClick={closeMobileMenu}
// //               >
// //                 <FaHeart className="mr-2 text-[#434153]" />
// //                 Wishlist
// //               </Link>
// //               <Link
// //                 to="/logout"
// //                 className="flex items-center px-4 py-2 text-black hover:bg-gray-100"
// //                 onClick={closeMobileMenu}
// //               >
// //                 <FaSignOutAlt className="mr-2 text-[#434153]" />
// //                 Logout
// //               </Link>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;


// // try2
// // import React, { useContext } from "react";
// // import { AuthContext } from "../context/AuthContext";
// // import { useNavigate } from "react-router-dom";

// // const Navbar = () => {
// //   const { user, logout } = useContext(AuthContext);
// //   const navigate = useNavigate();

// //   const handleLogout = async () => {
// //     await logout();
// //     navigate("/"); // Redirect to login after logout
// //   };

// //   return (
// //     <nav>
// //       {/* Other nav links */}
// //       {user ? (
// //         <>
// //           <span>Welcome, {user.name}</span>
// //           <button onClick={handleLogout}>Logout</button>
// //         </>
// //       ) : (
// //         <>
// //           <button onClick={() => navigate("/login")}>Login</button>
// //           <button onClick={() => navigate("/register")}>Register</button>
// //         </>
// //       )}
// //     </nav>
// //   );
// // };

// // export default Navbar;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { logout } from "../api/auth";
// import { useCart } from "../context/CartContext";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const { cartCount } = useCart();

//   const handleLogout = async () => {
//     try {
//       await logout();
//       navigate("/login");
//     } catch (err) {
//       console.error("Logout failed", err);
//     }
//   };

//   return (
//     <nav>
//       {/* Replace this with your actual links */}
//       <button onClick={() => navigate("/")}>Home</button>
//       <button onClick={() => navigate("/shop")}>Shop</button>
//       <button onClick={() => navigate("/orders")}>Orders</button>
//       <button onClick={() => navigate("/login")}>Login</button>
//       <button onClick={() => navigate( "/register" )}>Register</button>
//       <button onClick={() => navigate("/about")}>About Us</button>
//       <button onClick={() => navigate( "/contact" )}>Contact</button>
//       <button onClick={() => navigate("/cart")}>
//         Cart ({cartCount})
//       </button>
//       <button onClick={() => navigate("/wishlist")}>Wishlist</button>
//       {/* Logout button shown directly */}
//       <button onClick={handleLogout}>Logout</button>
//     </nav>
//   );
// };

// export default Navbar;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { logout } from "../api/auth";
// import { useCart } from "../context/CartContext";

// const Navbar = () => {
//   const [navOpen, setNavOpen] = useState(false);
//   const navigate = useNavigate();
//   const { cartCount } = useCart();

//   const handleLogout = async () => {
//     try {
//       await logout();
//       navigate("/login");
//     } catch (err) {
//       console.error("Logout failed", err);
//     }
//   };

//   return (
//     <header className="header bg-[#63ACFF]/[.77] w-full">
//       <nav className="nav container mx-auto flex items-center justify-between py-3 px-4 lg:px-8">
//         <a
//           onClick={() => navigate("/")}
//           className="nav__logo text-xl font-bold cursor-pointer"
//         >
//           AccessoriesMe
//         </a>

//         <div
//           className={`nav__menu fixed lg:static top-0 right-0 w-64 h-full bg-[#63ACFF]/[.95] lg:bg-transparent lg:w-auto flex flex-col lg:flex-row items-start lg:items-center gap-6 px-6 py-6 lg:p-0 transition-transform duration-300 z-50 ${
//             navOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
//           }`}
//         >
//           <button
//             className="nav__close self-end text-2xl lg:hidden"
//             onClick={() => setNavOpen(false)}
//           >
//             <i className="ri-close-line"></i>
//           </button>
//           <button onClick={() => navigate("/")} className="nav__link">
//             Home
//           </button>
//           <button onClick={() => navigate("/shop")} className="nav__link">
//             Shop
//           </button>
//           <button onClick={() => navigate("/about")} className="nav__link">
//             About Us
//           </button>
//           <button onClick={() => navigate("/contact")} className="nav__link">
//             Contact
//           </button>
//           <button onClick={() => navigate("/wishlist")} className="nav__link">
//             Wishlist
//           </button>
//           <button onClick={handleLogout} className="nav__link">
//             Logout
//           </button>
//         </div>

//         <div className="nav__actions flex items-center gap-4">
//           <button
//             onClick={() => navigate("/cart")}
//             className="relative text-2xl"
//           >
//             <i className="ri-shopping-cart-line"></i>
//             <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
//               {cartCount}
//             </span>
//           </button>

//           <button
//             onClick={() => navigate("/login")}
//             className="text-2xl hidden lg:inline"
//           >
//             <i className="ri-user-line"></i>
//           </button>

//           <button
//             className="nav__toggle text-2xl lg:hidden"
//             onClick={() => setNavOpen(true)}
//           >
//             <i className="ri-menu-line"></i>
//           </button>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // Wishlist heart
import MenuIcon from "@mui/icons-material/Menu"; // Mobile toggle
import CloseIcon from "@mui/icons-material/Close"; // Mobile close
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
          <button onClick={handleWishlistClick} className="wishlist-button">
            <FavoriteBorderIcon fontSize="large" />
          </button>

          <button onClick={handleCartClick} className="cart-button btn-nav">
            <Badge badgeContent={cartCount} color="error" overlap="rectangular">
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
            className="profile-button btn-nav"
          >
            <AccountCircleIcon fontSize="large" />
          </button>

          {/* Mobile toggle */}
          <button
            className="nav-toggle btn-nav"
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
          className="nav-close btn-nav"
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

