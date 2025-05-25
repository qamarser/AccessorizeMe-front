// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import { toast } from "react-toastify";
import "../styling/AuthForm.css";  

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await register(name, email, password);
      toast.success("Registered successfully!");
      setTimeout(() => navigate("/login"), 2000); // delay to show toast
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div>
          <label>Name:</label>
          <br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <p className="register-link">
          Already have an account? <a href="/login">Login</a>
        </p>
        <button type="submit">Register</button>
      </form>
      <div>
        <img src="/image53.png" alt="Register" />
      </div>
    </div>
  );
};

export default Register;
