import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NavLink = ({ to, children, onClick, className }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const [isHovered, setIsHovered] = useState(false); // State to track hover

  return (
    <span className={`${className}`}>
      <Link
        to={to}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)} 
        style={{
          color: isActive
            ? "#9292ff"
            : isHovered
            ? "orange" 
            : "navy",
          fontWeight: isActive ? "900" : isHovered
          ? "800" 
          : "500",
          textDecoration: "none", 
          transition: "color 0.3s ease", // Smooth transition
        }}
      >
        {children}
      </Link>
    </span>
  );
};

export default NavLink;
