import React from "react";
// import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="container mx-auto flex justify-between capitalize">
      <h1>Donor Track</h1>
      <nav>
        <ul className="flex gap-8 items-center p-2">
          <li><a href="#">Home</a></li>
          <li><a href="#">Donate</a></li>
          <li> <a href="#">Track Donations</a></li>
          <li><a href="#">Login</a> </li>
          <li><a href="#">Signup</a></li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
