import React from "react";
import "../styling/Aboutus.css";

function Aboutus()
{
  const formatText = (text) => {
    return text
      .toLowerCase()
      .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase());
  };

  return (
    <div className="about-us">
      <section className="who-we-are">
        <h2>Who We Are</h2>
        <p>
          {formatText(
            "AccessorizeMe is an online platform built for tech lovers who believe phone accessories should do more than just function. They should reflect personality, style, and innovation. We are passionate about creating products that not only protect your devices but enhance your everyday mobile experience."
          )}
        </p>
        <p>
          {formatText(
            "Driven by quality, creativity, and convenience, our goal is to make mobile personalization easy, enjoyable, and affordable for everyone."
          )}
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
            {formatText(
              "We specialize in high-quality phone accessories across a variety of categories, including:"
            )}
          </p>
          <ul>
            <li>
              <strong>Phone Cases & Covers</strong> – Trendy, protective, and
              customizable.
            </li>
            <li>
              <strong>Chargers & Cables</strong> – Fast-charging and durable
              options.
            </li>
            <li>
              <strong>Headphones & Audio Gear</strong> – For immersive sound
              experiences.
            </li>
            <li>
              <strong>Power Banks</strong> – Reliable power for on-the-go needs.
            </li>
            <li>
              <strong>Car Accessories</strong> – Smart add-ons for a smooth
              drive.
            </li>
            <li>
              <strong>Smart Accessories</strong> – Stay connected with modern
              gadgets.
            </li>
            <li>
              <strong>Mobile Stands & Holders</strong> – For convenience and
              comfort.
            </li>
          </ul>
        </div>

        <div className="key-features">
          <h3>Our Key Features:</h3>
          <ul>
            <li>Product variations like colors and styles.</li>
            <li>Custom image libraries for personalized designs.</li>
            <li>Easy navigation, smooth checkout, and secure payment.</li>
            <li>Role-based dashboard for customers and admins.</li>
            <li>Fast shipping and responsive customer support.</li>
          </ul>
        </div>
      </section>

      <p className="closing-statement">
        {formatText(
          "At AccessorizeMe, we make accessorizing your phone fun, easy, and totally you."
        )}
      </p>
    </div>
  );
}

export default Aboutus;
