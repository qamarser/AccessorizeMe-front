import React from "react";
import { useCart } from "../context/CartContext";
import { updateCartItem, deleteCartItem } from "../api/cart";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, loading, error, refreshCart, totalAmount } = useCart();
  console.log("Cart data:", cart);
  const navigate = useNavigate();

  const handleIncrement = async (item) => {
    try {
      await updateCartItem(item.id, item.quantity + 1);
      await refreshCart();
    } catch (err) {
      console.error("Failed to increment quantity", err);
    }
  };

  const handleDecrement = async (item) => {
    if (item.quantity <= 1) return; // Prevent quantity less than 1
    try {
      await updateCartItem(item.id, item.quantity - 1);
      await refreshCart();
    } catch (err) {
      console.error("Failed to decrement quantity", err);
    }
  };

  const handleDelete = async (item) => {
    try {
      await deleteCartItem(item.id);
      await refreshCart();
    } catch (err) {
      console.error("Failed to delete cart item", err);
    }
  };

  const handleCheckout = () => {
    navigate("/shipping");
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error loading cart: {error}</p>;
  if (!cart || cart.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id} className="mb-4 border-b pb-2">
            <p className="font-semibold">{item.Product ? item.Product.name : "Unknown Product"}</p>
            <p>
              Quantity: 
              <button onClick={() => handleDecrement(item)} className="ml-2 mr-2 px-2 py-1 bg-gray-300 rounded">-</button>
              {item.quantity}
              <button onClick={() => handleIncrement(item)} className="ml-2 px-2 py-1 bg-gray-300 rounded">+</button>
            </p>
            <p>Price: ${item.Product ? item.Product.price : "N/A"}</p>
            <button onClick={() => handleDelete(item)} className="mt-2 px-3 py-1 bg-red-500 text-white rounded">Remove</button>
          </li>
        ))}
      </ul>
      <div className="mt-4 font-semibold text-lg">
        Total Amount: ${totalAmount.toFixed(2)}
      </div>
      <button onClick={handleCheckout} className="mt-6 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
        Checkout
      </button>
    </div>
  );
}
