import React, { useEffect } from "react";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx';
import "./App.css";

function loadCSS(href) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

function Main() {
  useEffect(() => {
    loadCSS("https://cdn.jsdelivr.net/npm/react-toastify/dist/ReactToastify.css");
    loadCSS("https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css");
  }, []);

  return (
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<Main />);
