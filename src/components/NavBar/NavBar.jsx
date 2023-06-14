import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../Logo/Logo";
import CartWidget from "../CartWidget/CartWidget";
import "./NavBar.css";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header m-top">
      <Link to={"/"} id="logo">
        <Logo />
      </Link>

      <nav className="header-nav">
        <div
          className={`iconMenu ${isMenuOpen ? "open" : ""}`}
          onClick={handleMenuToggle}
        >
          <i
            className={`iconMenu ${isMenuOpen ? "bi bi-x" : "bi bi-list"}`}
          ></i>
        </div>
        <ul className={`nav-list ${isMenuOpen ? "open" : ""}`}>
          <li className="nav-item">
            <NavLink to={"/"} onClick={handleMenuToggle} activeclassname="active">
              All
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={"/categoria/shirts"} onClick={handleMenuToggle} activeclassname="active">
              Shirts
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={"/categoria/hoodies"} onClick={handleMenuToggle} activeclassname="active">
              Hoodies
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={"/categoria/shorts"} onClick={handleMenuToggle} activeclassname="active">
              Shorts
            </NavLink>
          </li>
        </ul>
      </nav>

      <CartWidget />
    </header>
  );
};

export default NavBar;
