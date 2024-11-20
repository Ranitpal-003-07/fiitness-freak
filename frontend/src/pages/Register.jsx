import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import '../Styles/Style.css'
import '@fortawesome/fontawesome-free/css/all.min.css';




const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [isSignUpMode, setIsSignUpMode] = useState(true);


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true); // Start loading
    try {
      // Send user registration details
      const response = await axios.post("/api/users/register", {
        name,
        email,
        password,
      });

      navigate("/SignIn");
      toast.success(
        "Registration successful! Check your email to verify your account."
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred during registration.";
      toast.error(errorMessage);
    } finally {
      setLoading(false); 
    }
  };

  return (
   <>
     <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          {/* Sign In Form */}
          <form action="#" className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" value="Login" className="btn solid" />
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>

          <form onSubmit={handleSubmit} className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" 
               value={name}
               onChange={(e) => setName(e.target.value)}
               placeholder="Name"
               required />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
               type={showPassword ? "text" : "password"}
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               placeholder="Password"
               required />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
               type={showConfirmPassword ? "text" : "password"}
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
               placeholder="Confirm Password"
               required
               />
               <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer"
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} size="lg" />
              ) : (
                <FontAwesomeIcon icon={faEye} size="lg" />
              )}
            </span>
            </div>
            <input type="submit" className="btn" value="Sign up" />
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
        </div>
      </div>

      {/* Panels */}
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={() => setIsSignUpMode(true)}
            >
              Sign up
            </button>
          </div>
          <img src="img/log.svg" className="image" alt="Sign Up" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={() => setIsSignUpMode(false)}
            >
              Sign in
            </button>
          </div>
          <img src="img/register.svg" className="image" alt="Sign In" />
        </div>
      </div>
    </div>
   </>
  );
};

export default Register;
