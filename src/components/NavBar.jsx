import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();

  const isActive = (pathname) => {
    return location.pathname === pathname ? "active" : "";
  };

  return (
    <div
      style={{
        justifyContent: "center",
        display: "flex",
        gap: "40px",
      }}
    >
      <Link to="/" className={isActive("/")}>
        Home
      </Link>
      <Link to="/about" className={isActive("/about")}>
        About
      </Link>
    </div>
  );
};

export default NavBar;
