import React, { useEffect, useState } from "react";
import { fetchBestSellers } from "../api/productApi";
import ProductCard from "./ProductCard";

import "../styling/BestSellers.css";

const BestSellers = () => {
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    const loadBestSellers = async () => {
      const data = await fetchBestSellers();
      setBestSellers(data);
    };
    loadBestSellers();
  }, []);

  if (bestSellers.length === 0) {
    return <p className="text-center my-8">No best sellers found.</p>;
  }

  return (
    <div className="best-sellers-container">
      <h2 className="best-sellers-heading">Best Sellers</h2>
      <div className="best-sellers-grid">
        {bestSellers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
