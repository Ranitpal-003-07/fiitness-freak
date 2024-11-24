import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import '../Styles/Style.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useAuth } from "../context/AuthContext";
import bannerAnimation from "../assets/banner-animation.json";
import bannerAnimation2 from "../assets/banner-animation2.json";
import Lottie from "lottie-react";




const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [email2, setEmail2] = useState("");
  const [password2, setPassword2] = useState("");
  const { login } = useAuth();


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
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const response = await axios.post("/api/users/login", {
        email2,
        password2,
      });

      toast.success("Sign in successful");

      login(response.data.token);

      // Redirect to home page
      navigate("/");
    } catch (error) {
      // Display error toast if login fails
       const errorMessage = error.response?.data?.message || error.message;
       console.error("Error signing in:", errorMessage);
       toast.error(`Error signing in: ${errorMessage}`);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
   <>
     <div className={`customcontainer ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="cforms-container">
        <div className="csignin-signup">
          {/* Sign In Form */}
          <form onSubmit={handleSubmit2} className="csign-in-form">
            <h2 className="ctitle">Sign in</h2>
            <div className="cinput-field">
              <i className="fas fa-user"></i>
              <input type="email"
              value={email2}
              onChange={(e) => setEmail2(e.target.value)}
              placeholder="Email"
              required />
            </div>
            <div className="cinput-field">
              <i className="fas fa-lock"></i>
              <input  type={showPassword ? "text" : "password"}
              value={password2}
              placeholder="Password"
              onChange={(e) => setPassword2(e.target.value)}
              required />
               <span
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer ceye"
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} size="lg" />
              ) : (
                <FontAwesomeIcon icon={faEye} size="lg" />
              )}
            </span>
            </div>
            <input type="submit" value={`${loading ? "Signing In..." : "Sign In"}`} className="btn solid" />
            <p className="csocial-text">Or Sign in with social platforms</p>
            <div className="csocial-media">
              <a href="#" className="csocial-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="csocial-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="csocial-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="csocial-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>

          <form onSubmit={handleSubmit} className="csign-up-form">
            <h2 className="ctitle">Sign up</h2>
            <div className="cinput-field">
              <i className="fas fa-user"></i>
              <input type="ctext" 
               value={name}
               onChange={(e) => setName(e.target.value)}
               placeholder="Name"
               required />
            </div>
            <div className="cinput-field">
              <i className="fas fa-envelope"></i>
              <input type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              />
            </div>
            <div className="cinput-field">
              <i className="fas fa-lock"></i>
              <input
               type={showPassword ? "text" : "password"}
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               placeholder="Password"
               required />
                <span
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer ceye"
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} size="lg" />
              ) : (
                <FontAwesomeIcon icon={faEye} size="lg" />
              )}
            </span>
            </div>
            <div className="cinput-field">
              <i className="fas fa-lock"></i>
              <input
               type={showConfirmPassword ? "text" : "password"}
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
               placeholder="Confirm Password"
               required
               />
               <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="cursor-pointer ceye"
            >
              {showConfirmPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} size="lg" />
              ) : (
                <FontAwesomeIcon icon={faEye} size="lg" />
              )}
            </span>
            </div>
            <input type="submit" className="btn" value="Sign up" />
            <p className="csocial-text">Or Sign up with social platforms</p>
            <div className="csocial-media">
              <a href="#" className="csocial-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="csocial-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="csocial-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="csocial-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
        </div>
      </div>

      {/* Panels */}
      <div className="cpanels-container">
        <div className="cpanel cleft-panel">
          <div className="ccontent">
          <Lottie
              animationData={bannerAnimation}
              style={{margin:"0",padding:"0"}}
              // Adjust size as needed
            />
            <h3>New here ?</h3>
            <p>
              Get Shreded With our premium plan
            </p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={() => setIsSignUpMode(true)}
            >
              Sign up
            </button>
          </div>
        </div>
        <div className="cpanel cright-panel">
          <div className="ccontent">
          <Lottie
            animationData={bannerAnimation2}
            style={{margin:"0",padding:"0"}}
          />
            <h3>One of us ?</h3>
            <p>
              Access to Merchs, Gym gears and many more
            </p>
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={() => setIsSignUpMode(false)}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
   </>
  );
};

export default SignIn;
