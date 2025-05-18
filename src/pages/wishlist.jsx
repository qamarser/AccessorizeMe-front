import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchWishlist,
  removeFromWishlist,
  addToWishlist,
} from "../api/wishlistApi";
import { addToCart } from "../api/cart";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { refreshCart } = useCart();

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const data = await fetchWishlist();
        setWishlist(data);
      } catch (err) {
        toast.error("Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    };
    loadWishlist();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1);
      await refreshCart();
      toast.success("Added to cart");
    } catch (err) {
      toast.error("product already in cart");
    }
  };

  // const handleAddToCart = async () => {
  //   try {
  //     setAdding(true);
  //     await addToCart(product.id, 1);
  //     await refreshCart();
  //     toast.success("Product added");
  //   } catch (error) {
  //     console.error("Error adding to cart:", error);
  //   } finally {
  //     setAdding(false);
  //   }
  // };

  // const handleAddToWishlist = async (productId) => {
  //   try {
  //     await addToWishlist(productId);
  //     toast.success("Added to wishlist");
  //     setWishlist((prev) => [...prev, { Product: { id: productId } }]);
  //   } catch (err) {
  //     toast.error("Failed to add to wishlist");
  //   }
  // };
  
  const handleRemoveFromWishlist = async (wishlistId) => {
    try {
      await removeFromWishlist(wishlistId);
      setWishlist((prev) => prev.filter((item) => item.id !== wishlistId));
      toast.success("Removed from wishlist");
    } catch (err) {
      toast.error("Failed to remove from wishlist");
    }
  };

  if (loading) return <p>Loading wishlist...</p>;
  if (!wishlist.length) return <p>Your wishlist is empty.</p>;

  return (
    <div>
      <h2 >Your Wishlist</h2>
      <ul>
        {wishlist.map((item) => (
          <li key={item.id} >
            <div

              onClick={() => navigate(`/product/${item.Product.id}`)}
            >
              <p >{item.Product.name}</p>
              <p>Price: ${item.Product.price}</p>
            </div>
            <div >
              <button
                onClick={() => handleAddToCart(item.Product.id)}

              >
                Add to Cart
              </button>
              <button
                onClick={() => handleRemoveFromWishlist(item.id)}

              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
