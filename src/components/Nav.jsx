import React from "react";
import logo from "../assets/images/logo1.png";

function Nav() {
  return (
    <nav className="flex justify-between capitalize py-2 bg- container mx-auto items-center">

      <h1> <img className="w-[100px]" src={logo} /></h1>
      <h1>
        {" "}
        <img className="w-[80px]" src={logo} />
      </h1>

      <div>
        <ul className="flex gap-8 justify-between items-center p-2">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/login">Login</a>{" "}
          </li>
          <li>
            <a href="/signup">Signup</a>
          </li>
          <li>
            <a href="/#">Logout</a>{" "}
          </li>
          <button
            type="submit"
            className="
            h-10
            px-5
            text-indigo-100
            bg-green-700
            rounded-full
            transition-colors
            duration-150
            focus:shadow-outline
          "
          >
            Go To Dashboard
          </button>
        </ul>
      </div>
    </nav>
  );
}
export default Nav;
