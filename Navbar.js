import React from "react";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <header className="header">
      <div className="logo">SWIFT</div>
      <div className="user-info">
        <div className="avatar">EH</div>
        <span className="username">Ervin Howell</span>
      </div>
    </header>
  );
};

export default Navbar;
