import React from "react";
import { useCart } from "../context/CartContext";
import { updateCartItem, deleteCartItem } from "../api/cart";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

function getImageUrl(url) {
  if (!url) return "";
  if (url.startsWith("http") || url.startsWith("https")) {
    return url;
  }
  return `${BASE_URL}${url}`;
}

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
      <h2>Your Cart</h2>
      <ul>
        {cart.map((item) => {
          // console.log("Cart item:", item); // Debug log to inspect cart item structure
          const product = item.Product;
          let imageUrl = "";
          if (
            item.ProductVariant &&
            item.ProductVariant.ProductColor &&
            item.ProductVariant.ProductColor.Images &&
            item.ProductVariant.ProductColor.Images.length > 0
          ) {
            imageUrl = getImageUrl(
              item.ProductVariant.ProductColor.Images[0].image_url
            );
          } else if (
            item.product_color_id &&
            item.ProductColor &&
            item.ProductColor.Images &&
            item.ProductColor.Images.length > 0
          ) {
            imageUrl = getImageUrl(item.ProductColor.Images[0].image_url);
          } else if (
            item.ProductVariant &&
            item.ProductVariant.Images &&
            item.ProductVariant.Images.length > 0
          ) {
            imageUrl = getImageUrl(item.ProductVariant.Images[0].image_url);
          } else if (product) {
            if (product.image_url) {
              imageUrl = getImageUrl(product.image_url);
            } else if (product.Images && product.Images.length > 0) {
              imageUrl = getImageUrl(product.Images[0].image_url);
            }
          }
          return (
            <li key={item.id} className="flex items-center space-x-4 mb-4">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={product ? product.name : "Product image"}
                  className="w-20 h-20 object-cover rounded"
                />
              )}
              <div>
                <p className="font-semibold">
                  {product ? product.name : "Unknown Product"}
                </p>
                <p>
                  Quantity:
                  <button onClick={() => handleDecrement(item)}>-</button>
                  {item.quantity}
                  <button onClick={() => handleIncrement(item)}>+</button>
                </p>
                <p>Price: ${product ? product.price : "N/A"}</p>
                <button onClick={() => handleDelete(item)}>Remove</button>
              </div>
            </li>
          );
        })}
      </ul>
      <div>Total Amount: ${totalAmount.toFixed(2)}</div>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}
