import Google from "../assets/images/google.png";
import { useState } from "react";


function SignUp() {
    const [show, setShow] = useState([false]);
    const [formData, setFormData] = useState({});
    const [error, setError] = useState({});
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    function handleSignUp(e) {
        e.preventDefault();
        const errors = {};
        (formData.firstName === "" || formData.firstName === undefined) &&
          (errors.firstName = "Please enter your first name");
        (formData.lastName === "" || formData.lastName === undefined) &&
          (errors.lastName = "Please enter your last name");
        (formData.emailAddress === "" || formData.emailAddress === undefined) &&
          (errors.emailAddress = "please enter your emailAddress");
        (formData.phoneNumber === "" || formData.phoneNumber === undefined) &&
          (errors.phoneNumber = "please enter your phoneNumber");
        (formData.passWord === "" || formData.passWord === undefined) &&
          (errors.passWord = "please enter your passWord");
    
        setError(errors);
    
        console.log(errors);
      }
    
    


  return (    <div className="bg-[linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)),url('assets/images/upperHero.jpg')]  bg-no-repeat bg-cover h-[50%]">
      <div className="w-[50%] text-center p-5 mx-auto ">
        <h1 className="text-4xl font-bold my-8 ">Create An Account</h1>
        <form action="" className="flex flex-col w-[50vw]">
          <div className="flex justify-between my-8">
            <div>
            {error.firstName && (
                <p className="text-red-500">{error.firstName}</p>
              )}
              <input
                type="text"
                placeholder="First Name"
                className="rounded-full py-4 px-6 border-2 outline-none border-gray-300 w-[50%]"
                onChange={(e) => handleChange(e)}
                name="firstName"
              />
            </div>
            <div>
            {error.firstName && (
                <p className="text-red-500">{error.lastName}</p>
              )}
              <input
                type="text"
                placeholder="Last Name"
                className="rounded-full py-4 px-6 border-2 outline-none border-gray-300 w-[50%]"
                onChange={(e) => handleChange(e)}
                name="lastName"
              />
            </div>
          </div>
          <div className="flex flex-col gap-8">
          {error.firstName && (
                <p className="text-red-500">{error.emailAddress}</p>
              )}
            <input
              type="email"
              placeholder="Email Address"
              className="rounded-full py-4 px-6 border-2 outline-none border-gray-300 w-[100%]"
              onChange={(e) => handleChange(e)}
              name="emailAddress"
            />
             {error.firstName && (
                <p className="text-red-500">{error.phoneNumber}</p>
              )}
            <input
              type="text"
              placeholder="Phone Number"
              className="rounded-full py-4 px-6 border-2 outline-none border-gray-300 w-[100%]"
              onChange={(e) => handleChange(e)}
              name="phoneNumber"
            />
            {error.firstName && (
                <p className="text-red-500">{error.passWord}</p>
              )}
            <div className="flex border-2 items-center rounded-full py-4 px-6  bg-white">
              <input
                type="pas"
                placeholder="Password"
                className="outline-none w-[100%]"
                name="passWord"
              />
            </div>
            {error.firstName && (
                <p className="text-red-500">{error.passWord}</p>
              )}
            <div className="flex border-2 items-center rounded-full py-4 px-6  bg-white">
              <input
                type="password"
                placeholder="Confirm your password"
                className=" outline-none w-[100%]"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="flex my-8 justify-between"></div>
          <button
           onClick={(e) => handleSignUp(e)}
            className="bg-teal-500 rounded-full py-4 px-2 text-white text-2xl font-bold"
          >
            Sign in
          </button>
        </form>
        <div className="flex items-center my[1em]">
          <div className="flex-grow h-px bg-slate-400"> </div>
          <p className="my-6 text-white">OR</p>
          <div className="flex-grow h-px bg-slate-400"> </div>
        </div>
        <div className="flex items-center gap-8 my-8 justify-center">
          <div>
            <button className="py-4 px-2 my-5 border-2 border-grey-400 gap-4 flex items-center rounded-full w-{70%} text-3xl text-sky-600 font-bold">
              <img src={Google} alt="" width={50} />
              
              <div className="text-3xl text-blue-500 font-bold" >
                <p>Sign In With Google</p>
              </div>
            </button>
          </div>
        </div>
        <p className="my-6 text-white">
          Already have an account yet?{" "}
          <span className="text-[#317F67]">Sign In</span>
        </p>
      </div>
     
    </div>
  );
}

export default SignUp;