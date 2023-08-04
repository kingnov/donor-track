import React from "react";
import Home from "./pages/Home";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Router from "./components/Router";
import AuthenticationButtons from "./context/State";

const App = () => {
  return (
    <div>
      <AuthenticationButtons>
        <Router />
      </AuthenticationButtons>
    </div>
  );
};

export default App;
