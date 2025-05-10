import axios from "./axiosInstance";

// Fetch all orders (admin)
export const fetchAllOrders = async (token) => {
  const response = await axios.get("/api/orders", {
    withCredentials: true,
  });
  return response.data;
};

// Fetch orders for the logged-in customer
export const fetchCustomerOrders = async (token) => {
  const response = await axios.get("/api/orders/my", {
    withCredentials: true,
  });
  return response.data;
};


export const placeOrder = async (orderData) => {
  const response = await axios.post("/api/orders", orderData, {
    withCredentials: true,
  });
  return response.data;
};