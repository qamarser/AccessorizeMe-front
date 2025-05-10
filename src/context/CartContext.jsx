// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { getCart } from "../api/cart"; // Adjust the import path as necessary

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const cartData = await getCart();
      setCart(cartData.items); // Update to set cart to items array from API response
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const safeCart = Array.isArray(cart) ? cart : [];

  const totalAmount = safeCart.reduce((sum, item) => {
    const price = item.Product ? parseFloat(item.Product.price) : 0;
    return sum + item.quantity * price;
  }, 0);

  const value = {
    cart: safeCart,
    loading,
    error,
    refreshCart: fetchCart,
    clearCart,
    cartCount: safeCart.reduce((sum, item) => sum + item.quantity, 0),
    totalAmount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
