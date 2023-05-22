import React from "react";
import { Link } from "react-router-dom";
import { List, ListItem } from "@mui/material";

const NavBar = () => {
  return (
    <div>
      <List
        sx={{
          display: "flex",
          position: "fixed",
          top: 0,
          width: "100vw",
          justifyContent: "center",
        }}
      >
        <ListItem sx={{ margin: "0 10px" }}>
          <Link to="/">Home</Link>
        </ListItem>
        <ListItem sx={{ margin: "0 10px" }}>
          <Link to="/about">About</Link>
        </ListItem>
      </List>
    </div>
  );
};

export default NavBar;
