import React from "react";
import { Link } from "react-router-dom";
import "../styling/Home.css";

const KittyGoHeadset = () => {
  return (
    <div className="container-hero-section">
      <div className="text-section">
        <h1>
          KITTY GO <br /> HEADSET
        </h1>
        <p>
          Crystal-clear sound <br />
          ergonomic design <br />
          perfect for gaming <br />
          and listening
        </p>
          </div>
          
      <Link to="/shop" className="shop-button">
        Shop Now
      </Link>

      <div className="image-section">
        <img src="/Group 126.png" alt="Kitty Go Headset" />
      </div>
    </div>
  );
};

export default KittyGoHeadset;
