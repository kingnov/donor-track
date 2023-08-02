import Google from "../assets/images/google.png";
import { useState, useRef, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";

function LogIn() {
  useEffect(() => {
    emailRef.current.focus();
  }, []);
  const auth = getAuth(app);
  const [logData, setLogData] = useState({});
  const [error, setError] = useState({});
  const [loginError, setLoginError] = useState("");
  const emailRef = useRef();
  const handleChange = (e) => {
    setLogData({ ...logData, [e.target.name]: e.target.value });
  };
  function handleLogIn(e) {
    e.preventDefault();
    const errors = {};
    (logData.emailAddress === "" || logData.emailAddress === undefined) &&
      (errors.emailAddress = "please enter your emailAddress");
    (logData.passWord === "" || logData.passWord === undefined) &&
      (errors.passWord = "please enter your passWord");

    setError(errors);
    console.log(errors);

    signInWithEmailAndPassword(auth, logData.emailAddress, logData.passWord)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.email);
        setLogData({
          emailAddress: "",
          passWord: "",
        });
        setLoginError("");
        emailRef.current.focus();
      })
      .catch((error) => {
        const errorMsg = error.message.substring(22, error.message.length - 2);
        setLoginError(errorMsg);
      });
  }
  return (
    <div className="bg-[linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)),url('assets/images/upperHero.jpg')] bg-no-repeat  bg-cover h-[80vh]">
      <div className="w-[40%] text-center mx-auto  ">
        <h1 className="text-4xl font-bold my-8 pt-5 text-white">
          Log in to your account
        </h1>
        {loginError !== "" && <p className="text-red-500">{loginError}</p>}
        <form action="" className="flex flex-col">
          <div className="flex flex-col gap-8">
            {error.emailAddress && (
              <p className="text-red-500 capitalize">{error.emailAddress}</p>
            )}
            <input
              name="emailAddress"
              onChange={(e) => handleChange(e)}
              type="email"
              placeholder="EmailAddress"
              className="rounded-full py-4 px-6 border-2 border-gray-300"
              ref={emailRef}
              value={logData.emailAddress}
            />

            {error.passWord && <p className="text-red-500">{error.passWord}</p>}
            <div className="flex border-2 items-center rounded-full py-4 px-6 bg-white ">
              <input
                name="passWord"
                onChange={(e) => handleChange(e)}
                type="password"
                placeholder="Password"
                className="outline-none w-[100%] "
                value={logData.passWord}
              />
            </div>
          </div>
          <div className="flex my-8 justify-between">
            <div className="flex gap-4">
              <input type="checkbox" />
              <p className="text-white">Remember me</p>
            </div>
            <div>
              <p className="text-white">Forgot Your Password?</p>
            </div>
          </div>
          <button
            onClick={(e) => handleLogIn(e)}
            className="bg-[#317F67] rounded-full py-6 px-6 text-white text-2xl font-weight"
          >
            Sign in
          </button>
        </form>

        <p className="my-6 text-white">
          Don't have an account yet?{" "}
          <span className="text-[#5eebc1] ">Sign Up free</span>
        </p>
      </div>
    </div>
  );
}

export default LogIn;
