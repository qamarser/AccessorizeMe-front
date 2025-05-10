import React, { useEffect, useState } from "react";
import { fetchBestSellers } from "../api/productApi";
import ProductCard from "./ProductCard";

import "../styling/BestSellers.css";

const BestSellers = () => {
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    const loadBestSellers = async () => {
      const data = await fetchBestSellers();
      console.log("Fetched best sellers:", data); // Check this in browser console
      setBestSellers(data);
    };
    loadBestSellers();
  }, []);

  if (bestSellers.length === 0) {
    return <p className="text-center my-8">No best sellers found.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Best Sellers</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {bestSellers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
