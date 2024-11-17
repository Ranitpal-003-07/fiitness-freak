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
        onMouseEnter={() => setIsHovered(true)} // Handle hover start
        onMouseLeave={() => setIsHovered(false)} // Handle hover end
        style={{
          color: isActive
            ? "#9292ff"
            : isHovered
            ? "aliceblue" // Change color on hover
            : "#000060",
          fontWeight: isActive ? "900" : "700",
          textDecoration: "none", // Remove underline
          transition: "color 0.3s ease", // Smooth transition
        }}
      >
        {children}
      </Link>
    </span>
  );
};

export default NavLink;
