import React from 'react'
import { useState } from 'react'
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import Login from './pages/Login'
import Register from './pages/Register'
import Aboutus from "./pages/Aboutus";
import Contactus from "./pages/Contactus";
import Cart from "./pages/Cart";
import Wishlist from "./pages/wishlist";
import ShippingPage from './pages/Shipping'
import CustomerOrders from './pages/CustomerOrders'
import AuthForm from './pages/AuthForm'
import UserProfile from './pages/UserProfile'

// admin pages
import AdminDashboard from './pages/dashboard/AdminDashboard'
import AdminShippingPage from './pages/dashboard/shipping/AdminShippingPage'
import OrdersPage from './pages/dashboard/orders/Orders'
import AdminCategory from './pages/dashboard/category/AdminCategory'
import AdminUser from './pages/dashboard/user/AdminUser'
import AdminReview from './pages/dashboard/review/AdminReview'
import AdminProductManagement from './pages/dashboard/product/AdminProductManagement';
import AdminProductColorsVariants from './pages/dashboard/AdminProductColorsVariants';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './App.css'

import { AuthProvider } from './context/AuthContext'
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";


function App()
{
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isAuthRoute = location.pathname === "/login" || location.pathname === "/register";

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <>
            {!isAdminRoute && !isAuthRoute && <Navbar />}

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />

              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<Aboutus />} />
              <Route path="/contact" element={<Contactus />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/orders" element={<CustomerOrders />} />
              <Route path="/login" element={<AuthForm />} />
              <Route path="/profile" element={<UserProfile />} />

              {/* Admin routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route
                path="/admin/dashboard/shipping"
                element={<AdminShippingPage />}
              />
              <Route path="/admin/dashboard/orders" element={<OrdersPage />} />
              <Route
                path="/admin/dashboard/category"
                element={<AdminCategory />}
              />
              <Route path="/admin/dashboard/users" element={<AdminUser />} />
              <Route
                path="/admin/dashboard/reviews"
                element={<AdminReview />}
              />
              <Route
                path="/admin/dashboard/products"
                element={<AdminProductManagement />}
              />
              {/* Add more routes as needed */}
              <Route path="/admin/dashboard/colors-variants" element={<AdminProductColorsVariants />} />
            </Routes>
            <ToastContainer />
            {/* <Footer /> */}
          </>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App
