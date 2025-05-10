import axiosInstance from "./axiosInstance";

// Fetch all reviews for a product by product ID
export const fetchReviewsByProductId = async (productId) => {
  const response = await axiosInstance.get(`/api/reviews/product/${productId}`);
  return response.data;
};

// Post a new review
export const postReview = async (review) => {
  const response = await axiosInstance.post(`/api/reviews/add`, review, {
    withCredentials: true,
  });
  return response.data;
};
