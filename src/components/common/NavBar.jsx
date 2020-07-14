import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <span className="navbar-brand">Vidly</span>
      <ul className="navbar-nav mr-auto">
        <li className="nav-link">
          <NavLink to="/customers">Customers</NavLink>
        </li>
        <li className="nav-link">
          <NavLink to="/rentals">Rentals</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
