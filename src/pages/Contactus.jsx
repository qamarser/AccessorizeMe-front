import React from "react";
import Button from "../components/Button"; 
import "../styling/Contactus.css"; 

const Contactus = () =>
{
  const handleContactClick = () => {
    alert("this functionality will be soon added");
  };
  return (
    <div className="contact-container">
      <div className="image-section">
        <img src="/unsplash_TyanDMPxwHc.png" alt="Contact" />
      </div>
      <div className="form-section">
        <h2>Contact Us</h2>
        <form>
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="E-mail" />
          <textarea placeholder="Message" rows={4}></textarea>
          <Button text="Contact Us" onClick={handleContactClick} />
        </form>
      </div>
    </div>
  );
};

export default Contactus;
