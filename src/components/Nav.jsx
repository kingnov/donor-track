import React from "react";
// import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="container mx-auto flex justify-between capitalize">
      <h1>LOGO</h1>
      <div>
        <ul className="flex gap-8 justify-between items-center p-2">
          <li><a href="#">Home</a></li>
          <li><a href="#">Donate</a></li>
          <li> <a href="#">Track Donations</a></li>
          <li><a href="#">Login</a> </li>
          <li><a href="#">Signup</a></li>
        </ul>
      </div>
    </nav>
  );
}
export default Nav;
