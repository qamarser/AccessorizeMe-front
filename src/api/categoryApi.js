import axios from "axios";
import axiosInstance from "./axiosInstance";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchAllCategories = async () => {
  const response = await axiosInstance.get("/api/categories");
  return response.data;
};

export const fetchCategoryById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching category with id ${id}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

export const createCategory = async (formData, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/categories`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error creating category:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateCategory = async (id, data, token) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/categories/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      `Error updating category with id ${id}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteCategory = async (id, token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      `Error deleting category with id ${id}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchProductsByCategory = async (categoryId, filters = {}) => {
  try {
    const params = new URLSearchParams();

    if (filters.minPrice !== undefined) {
      params.append("minPrice", filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
      params.append("maxPrice", filters.maxPrice);
    }
    if (filters.search) {
      params.append("search", filters.search);
    }

    const response = await axios.get(
      `${BASE_URL}/api/categories/${categoryId}/products?${params.toString()}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching products for category id ${categoryId}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};
