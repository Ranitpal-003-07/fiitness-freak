import React, { useState } from "react";
import Hamburger from "hamburger-react";
import { useLocation } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import NavLink from "../components/NavLink"; // Import NavLink
import "../Styles/Navbar.css";


const Navbar = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { isAuthenticated, user, logout } = useAuth(); 
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenu(!isMenu);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible); 
  };
  

  return (
    <div className="navbar">
       <div className="nav-logo">
        Aimfit
       </div>
       <div className="navbar-content">
        <div className="desktop-links">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/Features" className="nav-link">
            Features
          </NavLink>
          <NavLink to="/AboutUs" className="nav-link">
            About Us
          </NavLink>
          <NavLink to="/Programs" className="nav-link">
            Programs
          </NavLink>
        </div>
        
        <div className="bar-icon">
          <Hamburger 
          toggled={isMenu} toggle={toggleMenu} />
        </div>
        <div className="mbl-menu"
        style={{
          display: isMenu ? "" : "none"
        }}
        >
          <div className="prof"
           style={{display:isAuthenticated?"":"none"}}
          >
          <img src="" alt="" className="userimg" />
          {/* <p className="username">{isAuthenticated?user.name:"user"}</p> */}
          </div>
          <NavLink to="/" className="nav-link2" onClick={toggleMenu}>
            Home
          </NavLink>
          <NavLink to="/Features" className="nav-link2" onClick={toggleMenu}>
            Features
          </NavLink>
          <NavLink to="/AboutUs" className="nav-link2" onClick={toggleMenu}>
            About Us
          </NavLink>
          <NavLink to="/Programs" className="nav-link2" onClick={toggleMenu}>
            Programs
          </NavLink>
          <div className="logreg">
            <NavLink to="/SignIn" className="nav-link3" onClick={toggleMenu}>Log-In</NavLink>
            <hr className="line1" />
            <NavLink to="/Register" className="nav-link3" onClick={toggleMenu}>Sign-Up</NavLink>
          </div>
          <div className="logout"
           style={{display:isAuthenticated?"":"none"}}
          >
            <button
              onClick={() => {
              logout();
              setIsDropdownVisible(false);
              }}
              style={{
                margin:"0",
              }}
            >
              <FiLogOut size={20} className="" /> Logout
            </button>
          </div>
        </div>
        <div className="desktop-menu">
          <div className="reglog"
          style={{display:isAuthenticated?"none":""}}
          >
            <NavLink to="/SignIn" className="nav-link4" >Log-In</NavLink>
            <NavLink to="/Register" className="nav-link4">Sign-Up</NavLink>
          </div>
          <div className="profil"
           style={{display:isAuthenticated?"":"none"}}
           >
            <NavLink to="/profile" className="nav-link5" >
              <img src="" alt="img" className="userimg2" />
            </NavLink>
          </div>
        </div>
       </div>
    </div>
  );
};

export default Navbar;