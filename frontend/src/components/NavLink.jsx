// components/NavLink.js
import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavLink = ({ to, children, onClick, className }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <span className={`${className}`}>
      <Link
        to={to}
        onClick={onClick}
        style={{
          color: isActive ? "#9292ff" : "", fontWeight: isActive? "900":""
        }}
        
      >
        {children}
      </Link>
    </span>
  );
};

export default NavLink;
