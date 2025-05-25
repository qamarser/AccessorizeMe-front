import React from "react";
import "../styling/Aboutus.css";

function Aboutus() {
  return (
    <div className="about-us">
      <section className="who-we-are">
        <h2>Who We Are</h2>
        <p>
          Accessories is An Online Platform Built For Tech Lovers Who Believe
          Phone Accessories Should Do More Than Just Function – They Should
          Rellect Personality, Style, And Innovation. We Are Positionate About
          Believing Products That Not Only Protect Your Devices But Enhance Your
          Everyday Mobile Experience.
        </p>
        <p>
          Driven By Quality, Creativity, And Convenience, Our Goal Is To Make
          Mobile Personalization Easy, Enjoyable, And Affordable For Everyone.
        </p>
        <img
          src="/image27.png"
          alt="Person holding phone with accessories"
          className="who-we-are-image"
        />
      </section>

      <section className="what-we-offer">
        <h2>What We Offer</h2>

        <div className="offer-categories">
          <p>
            We Specialize In High-Quality Phone Accessories Across A Variety Of
            Categories, including:
          </p>
          <ul>
            <li>
              <strong>Phone Cores & Covers</strong> – Tromp, Protective, And
              Customizable
            </li>
            <li>
              <strong>Chargers & Codes</strong> – Fast-Charging And Durable
              Options
            </li>
            <li>
              <strong>Headphones & Audio Gear</strong> – For Immediate Sound
              Experiences
            </li>
            <li>
              <strong>Power Banks</strong> – Fortune Power For
              On-Thre-Go.Unstyles
            </li>
            <li>
              <strong>Card Accessories</strong> – Smart Ads-Don For A Smooth
              Drive
            </li>
            <li>
              <strong>Smart Accessories</strong> – Stay Connected With Modern
              Godgets
            </li>
            <li>
              <strong>Mobile Snacks & Holders</strong> – For Convenience And
              Comfort
            </li>
          </ul>
        </div>

        <div className="key-features">
          <h3>Our Key Features:</h3>
          <ul>
            <li>Product Verbalances Like Colors And Styles</li>
            <li>Custom Image Libraries For Personalized Saves</li>
            <li>Day Navigation, Smooth Checksuit, And Secure Payment</li>
            <li>Role-Based Deathboard for Customers And Admins</li>
            <li>Fast Shipping And Responsive Customer Support</li>
          </ul>
        </div>
      </section>

      <p className="closing-statement">
        At AccessoriesMe, We Make Accessorizing Your Phone Fun, Easy, And
        Totally You.
      </p>
    </div>
  );
}

export default Aboutus;
