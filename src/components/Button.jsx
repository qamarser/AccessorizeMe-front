import React from "react";
import "../styling/Button.css"; 

const Button = ({ text }) => {
  return <button className="contact-button">{text}</button>;
};

export default Button;
