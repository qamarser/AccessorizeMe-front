import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { register as registerApi } from "../api/auth";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styling/AuthForm.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPasswordSignup, setShowPasswordSignup] = useState(false);
  const [showPasswordLogin, setShowPasswordLogin] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(loginData.email)) {
      setError("Invalid email format.");
      return;
    }

    try {
      const data = await login(loginData.email, loginData.password);
      const role = data.user.role;
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(signupData.email)) {
      setError("Invalid email format.");
      return;
    }

    if (!validatePassword(signupData.password)) {
      setError(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol."
      );
      return;
    }

    try {
      await registerApi(signupData.name, signupData.email, signupData.password);
      toast.success("Registered successfully!");
      setTimeout(() => setIsLogin(true), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div id="back">
      <canvas id="canvas" className="canvas-back"></canvas>
      <div className="backRight"></div>
      <div className="backLeft"></div>

      <div id="slideBox" style={{ marginLeft: isLogin ? "50%" : "0" }}>
        <div className="topLayer" style={{ marginLeft: isLogin ? "0" : "100%" }}>
          {/* REGISTER */}
          <div className="left">
            <div className="content">
              <h2>Sign Up</h2>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <form onSubmit={handleRegister}>
                <div className="form-element form-stack">
                  <label>Name</label>
                  <input
                    type="text"
                    value={signupData.name}
                    onChange={(e) =>
                      setSignupData({ ...signupData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-element form-stack">
                  <label>Email</label>
                  <input
                    type="email"
                    value={signupData.email}
                    onChange={(e) =>
                      setSignupData({ ...signupData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-element form-stack password-container">
                  <label>Password</label>
                  <input
                    type={showPasswordSignup ? "text" : "password"}
                    value={signupData.password}
                    onChange={(e) =>
                      setSignupData({ ...signupData, password: e.target.value })
                    }
                    required
                  />
                  <span
                    className="eye-icon"
                    onClick={() => setShowPasswordSignup(!showPasswordSignup)}
                  >
                    {showPasswordSignup ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <div className="form-element form-submit">
                  <button className="signup" type="submit">
                    Sign up
                  </button>
                  <button
                    type="button"
                    className="signup off"
                    onClick={() => setIsLogin(true)}
                  >
                    Log In
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* LOGIN */}
          <div className="right">
            <div className="content">
              <h2>Login</h2>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <form onSubmit={handleLogin}>
                <div className="form-element form-stack">
                  <label>Email</label>
                  <input
                    type="email"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-element form-stack password-container">
                  <label>Password</label>
                  <input
                    type={showPasswordLogin ? "text" : "password"}
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    required
                  />
                  <span
                    className="eye-icon"
                    onClick={() => setShowPasswordLogin(!showPasswordLogin)}
                  >
                    {showPasswordLogin ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <div className="form-element form-submit">
                  <button className="login" type="submit">
                    Log In
                  </button>
                  <button
                    type="button"
                    className="login off"
                    onClick={() => setIsLogin(false)}
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
