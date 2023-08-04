import React, { useEffect } from "react";
import logo from "../assets/images/logo1.png";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationButtons, { StateContext } from "../context/State";
import { useContext } from "react";

function Nav() {
  const { isLoggedIn, setIsLoggedIn } = useContext(StateContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    location.reload()
    navigate("/");
  };

  useEffect(() => {
    let userData = localStorage.getItem("user");
    if (userData) {
      setIsLoggedIn(true);
      console.log(isLoggedIn);
    }
  }, []);

  return (
    <nav className="flex justify-between capitalize py-2 bg- container mx-auto items-center">
      {/* <h1> <img className="w-[100px]" src={logo} /></h1> */}
      <h1>
        {" "}
        <Link to="/">
          <img className="w-[80px]" src={logo} />
        </Link>
      </h1>

      <div>
        <ul className=" flex gap-8 justify-between items-center p-2">
          <li className="button">
            <Link to="/"> Home</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li onClick={handleLogout} className="button">
                <Link to="/"> Logout</Link>{" "}
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
                <Link to="/orgDashboard">Go To Dashboard</Link>
              </button>
            </>
          ) : (
            <>
              <li className="button">
                <Link to="/login">Login</Link>{" "}
              </li>
              <li className="button">
                <Link to="/signup"> Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
export default Nav;
