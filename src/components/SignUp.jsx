import Google from "../assets/images/google.png";
import { useState, useRef, useEffect  } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { app, db } from "../firebase";
import { Link,useNavigate } from "react-router-dom";

function SignUp() {
  useEffect(() => {
    emailRef.current.focus();
  }, []);
  const auth = getAuth();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState({});
  const [signupError, setSignupError] = useState("");
  const emailRef = useRef();
  const navigate=useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  async function handleSignUp(e) {
    e.preventDefault();
    const errors = {};

    (formData.organizationName === "" ||
      formData.organizationName === undefined) &&
      (errors.organizationName = "Please enter your organization Name");
    (formData.lastName === "" || formData.lastName === undefined) &&
      (errors.lastName = "Please enter your last name");
    (formData.emailaddress === "" || formData.emailaddress === undefined) &&
      (errors.emailaddress = "please enter your emailaddress");
    (formData.phoneNumber === "" || formData.phoneNumber === undefined) &&
      (errors.phoneNumber = "please enter your phoneNumber");
    (formData.passWord === "" || formData.passWord === undefined) &&
      (errors.passWord = "please enter your passWord");
    (formData.category === "" || formData.category === undefined) &&
      (errors.category = "please select your category");

    setError(errors);

    createUserWithEmailAndPassword(
      auth,
      formData.emailaddress,
      formData.passWord
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.email);
        setFormData({
          organizationName: "",
          lastName: "",
          emailAddress: "",
          phoneNumber: "",
          passWord: "",
          category: "",
        });
        setSignupError("");
        navigate("/login");
      })
      .catch((error) => {
        const errorMsg = error.message.substring(22, error.message.length - 2);
        setSignupError(errorMsg);
      });

    await addDoc(collection(db, "users"), formData);
    formData.emailaddress = "";
  }

  return (
    <div className="bg-[linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)),url('assets/images/upperHero.jpg')]  bg-no-repeat bg-cover h-[50%]">
      <div className="w-[40%] text-center p-5 mx-auto  ">
        <h1 className="text-4xl font-bold my-8 text-white">
          Create an Account for Your Organization
        </h1>
        {signupError !== "" && <p className="text-red-500">{signupError}</p>}
        <form action="" className="flex flex-col my-10">
          <div emailaddress="flex flex-col gap-8">
            {error.organizationName && (
              <p className="text-red-500">{error.organizationName}</p>
            )}
            <input
              type="organizationName"
              placeholder="OrganizationName"
              className="rounded-full py-4 px-6 my-5 border-2 outline-none border-gray-300 w-[100%]"
              onChange={(e) => handleChange(e)}
              name="organizationName"
              value={formData.organizationName}
            />

            {error.emailaddress && (
              <p className="text-red-500">{error.emailaddress}</p>
            )}
            <input
              type="email"
              placeholder="Email Address"
              className="rounded-full py-4 px-6 border-2 my-5 outline-none border-gray-300 w-[100%]"
              onChange={(e) => handleChange(e)}
              name="emailaddress"
              ref={emailRef}
              value={formData.emailaddress}
            />
            {error.phoneNumber && (
              <p className="text-red-500">{error.phoneNumber}</p>
            )}
            <input
              type="text"
              placeholder="Phone Number"
              className="rounded-full py-4 px-6 border-2 my-5 outline-none border-gray-300 w-[100%]"
              onChange={(e) => handleChange(e)}
              name="phoneNumber"
              value={formData.phoneNumber}

            />
            {error.passWord && <p className="text-red-500">{error.passWord}</p>}
          
              <input
                type="password"
                onChange={(e) => handleChange(e)}
                placeholder="Password"
                className="outline-none my-5 p-5 rounded-full w-[100%]"
                name="passWord"
                value={formData.passWord}
              />
           
           
          </div>
          <div className="flex my-8 justify-between"></div>
          <button
            onClick={(e) => handleSignUp(e)}
            className="bg-[#317F67] rounded-full py-4 px-2 text-white  text-2xl font-bold"
          >
            Sign Up
          </button>
        </form>
        <div className="flex items-center gap-8 my-8 justify-center"></div>
        <p className="my-6 text-white">
          Already have an account yet?{" "}
      <Link to="/login"><span className="text-[#5eebc1]">Log In</span></Link> 
        </p>
      </div>
    </div>
  );
}

export default SignUp;
