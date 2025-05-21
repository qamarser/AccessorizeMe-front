import React from "react";
import "../styling/Button.css"; 

const Button = ({ text, onClick, className }) => {
  return (
    <button className={`base-button ${className || ""}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
