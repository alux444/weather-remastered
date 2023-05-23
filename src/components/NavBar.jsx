import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

const NavBar = () => {
  return (
    <div
      style={{
        width: "600px",
        justifyContent: "center",
        display: "flex",
        gap: "40px",
      }}
    >
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </div>
  );
};

export default NavBar;
