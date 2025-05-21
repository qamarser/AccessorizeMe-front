import React, { useEffect, useState } from "react";
import { fetchAllCategories } from "../api/categoryApi";
import "../styling/CategoryList.css";

const CategoryList = ({ categories: propCategories, onSelectCategory }) => {
  const [categories, setCategories] = useState(propCategories || []);
  const [loading, setLoading] = useState(!propCategories);

  useEffect(() => {
    if (!propCategories) {
      async function fetchCategories() {
        try {
          const data = await fetchAllCategories();
          if (Array.isArray(data)) {
            setCategories(data);
          } else if (data && Array.isArray(data.categories)) {
            setCategories(data.categories);
          } else {
            setCategories([]);
          }
        } catch (error) {
          console.error("Failed to fetch categories", error);
        } finally {
          setLoading(false);
        }
      }
      fetchCategories();
    }
  }, [propCategories]);

  useEffect(() => {
    if (propCategories) {
      setCategories(propCategories);
    }
  }, [propCategories]);

  if (loading) return <div>Loading categories...</div>;

  return (
    <div className="container-category-list">
      <h2>Categories</h2>
      <ul className="category-list">
        {categories.length > 0 ? (
          categories.map((cat) => (
            <li
              key={cat.id}
              className="category item"
              onClick={() => onSelectCategory(cat.id)}
              style={{
                backgroundImage: `url(${cat.background_image_url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <label>{cat.name}</label>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500">No categories available</li>
        )}
      </ul>
    </div>
  );
};

export default CategoryList;
