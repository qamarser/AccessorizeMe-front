import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllCategories } from "../api/categoryApi";
import CategoryList from "../components/CategoryList";
import HeroSection from "../components/HeroSection";
import BestSellers from "../components/BestSellers";
import Button from "../components/Button";
function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllCategories().then((data) => {
      console.log("Fetched categories data:", data);
      if (Array.isArray(data)) {
        setCategories(data);
      } else if (data && Array.isArray(data.categories)) {
        setCategories(data.categories);
      } else {
        setCategories([]);
      }
    });
  }, []);

  const handleCategoryClick = (categoryId) => {
    // Navigate to category page with route param
    navigate(`/shop`);
  };

  return (
    <div>
      <HeroSection />
      <CategoryList
        categories={categories}
        onSelectCategory={handleCategoryClick}
      />
      {/* <button
        className="btn-view-more"
        onClick={() => navigate( "/shop" )}>view more</button> */}
      <div className="view-more-container">
        <Button
          className="contact-button"
          onClick={() => navigate("/shop")}
          text="View More"
        />
      </div>
      <BestSellers />
    </div>
  );
}

export default Home;
