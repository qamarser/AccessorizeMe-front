import React from 'react'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
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

// admin pages
import AdminDashboard from './pages/dashboard/AdminDashboard'
import AdminShippingPage from './pages/dashboard/AdminShippingPage'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './App.css'

import { AuthProvider } from './context/AuthContext'
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <>
            <Navbar />
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
              {/* Admin routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/shipping" element={<AdminShippingPage />} />
              {/* Add more routes as needed */}
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
