// src/api/cartApi.js
import axiosInstance from "./axiosInstance";

// Add to cart
export const addToCart = async (product_id, quantity) => {
  const response = await axiosInstance.post(
    "/api/cart/add",
    { product_id, quantity },
    { withCredentials: true }
  );
  console.log("Add to cart response:", response.data);
  return response.data;
};

// Get user's cart
export const getCart = async () => {
  const response = await axiosInstance.get("/api/cart", {
    withCredentials: true,
  });
  console.log("Get cart response:", response.data);
  return response.data;
};

// Update cart item quantity
export const updateCartItem = async (cartItemId, quantity) => {
  const response = await axiosInstance.put(
    `/api/cart/${cartItemId}`,
    { quantity },
    { withCredentials: true }
  );
  return response.data;
};

// Remove item from cart
export const deleteCartItem = async (cartItemId) => {
  const response = await axiosInstance.delete(`/api/cart/${cartItemId}`, {
    withCredentials: true,
  });
  return response.data;
};
