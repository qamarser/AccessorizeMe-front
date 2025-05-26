import React, { Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './App.css'

import { AuthProvider } from './context/AuthContext'
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

const Navbar = lazy(() => import('./components/Navbar'))
const Home = lazy(() => import('./pages/Home'))
const Shop = lazy(() => import('./pages/Shop'))
const ProductDetails = lazy(() => import('./pages/ProductDetails'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Aboutus = lazy(() => import('./pages/Aboutus'))
const Contactus = lazy(() => import('./pages/Contactus'))
const Cart = lazy(() => import('./pages/Cart'))
const Wishlist = lazy(() => import('./pages/wishlist'))
const ShippingPage = lazy(() => import('./pages/Shipping'))
const CustomerOrders = lazy(() => import('./pages/CustomerOrders'))
const UserProfile = lazy(() => import('./pages/UserProfile'))
const Footer = lazy( () => import( './components/Footer' ) )

// admin pages
const AdminDashboard = lazy(() => import('./pages/dashboard/AdminDashboard'))
const AdminShippingPage = lazy(() => import('./pages/dashboard/shipping/AdminShippingPage'))
const OrdersPage = lazy(() => import('./pages/dashboard/orders/Orders'))
const AdminCategory = lazy(() => import('./pages/dashboard/category/AdminCategory'))
const AdminUser = lazy(() => import('./pages/dashboard/user/AdminUser'))
const AdminReview = lazy(() => import('./pages/dashboard/review/AdminReview'))
const AdminProductManagement = lazy(() => import('./pages/dashboard/product/AdminProductManagement'))
const AdminProductColorsVariants = lazy(() => import('./pages/dashboard/AdminProductColorsVariants'))

function App()
{
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isAuthRoute = location.pathname === "/login" || location.pathname === "/register";

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Suspense fallback={<div>Loading...</div>}>
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
            {!isAdminRoute && <Footer />}
          </Suspense>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App
