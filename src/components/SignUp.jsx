import Google from "../assets/images/google.png";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { app, db } from "../firebase";

function SignUp() {

  const auth = getAuth();

  const [formData, setFormData] = useState({});
  const [error, setError] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  async function handleSignUp(e) {
    e.preventDefault();
    const errors = {};

    (formData.organizationName === "" || formData.organizationName === undefined) &&
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
      })
      .catch((error) => {
        console.log(error)
      });
      await addDoc(collection(db, "users"), formData)
      formData.emailaddress=""
  }


  // const handleCategory=(e)=>{

  //   console.log(e.target.value)
  // }

  return (
    <div className="bg-[linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)),url('assets/images/upperHero.jpg')]  bg-no-repeat bg-cover h-[50%]">
      <div className="w-[50%] text-center p-5 mx-auto ">
        <h1 className="text-4xl font-bold my-8 text-white">Creat an Account for Your Organization</h1>
        <form action="" className="flex flex-col my-10">
          
          <div emailaddress="flex flex-col gap-8">
          {error.organizationName && (
              <p className="text-red-500">{error.organizationName}</p>
            )}
            <input
              type="organizationName"
              placeholder="OrganizationName"
              className="rounded-full py-4 px-6 border-2 outline-none border-gray-300 w-[100%]"
              onChange={(e) => handleChange(e)}
              name="organizationName"
            />
          
            {error.emailaddress&& (
              <p className="text-red-500">{error.emailaddress}</p>
            )}
            <input
              type="email"
              placeholder="Email Address"
              className="rounded-full py-4 px-6 border-2 outline-none border-gray-300 w-[100%]"
              onChange={(e) => handleChange(e)}
              name="emailaddress"
            />
            {error.phoneNumber && (
              <p className="text-red-500">{error.phoneNumber}</p>
            )}
            <input
              type="text"
              placeholder="Phone Number"
              className="rounded-full py-4 px-6 border-2 outline-none border-gray-300 w-[100%]"
              onChange={(e) => handleChange(e)}
              name="phoneNumber"
            />
            {error.passWord && <p className="text-red-500">{error.passWord}</p>}
            <div className="flex border-2 items-center rounded-full py-4 px-6 bg-white">
              <input
                type="password"
                onChange={(e) => handleChange(e)}
                placeholder="Password"
                className="outline-none w-[100%]"
                name="passWord"
              />
            </div>
            {/* {error.passWord&& (
                <p className="text-red-500">{error.passWord}</p>
              )}
            <div className="flex border-2 items-center rounded-full py-4 px-6  bg-white">
              <input
                type="password"
                placeholder="Confirm your password"
                className=" outline-none w-[100%]"
                onChange={(e) => handleChange(e)}
              />
            </div> */}
  
          </div>
          <div className="flex my-8 justify-between"></div>
          <button
            onClick={(e) => handleSignUp(e)}
            className="bg-teal-500 rounded-full py-4 px-2 text-white  text-2xl font-bold"
          >
            Sign Up
          </button>
        </form>
        {/* <div className="flex items-center my[1em]">
          <div className="flex-grow h-px bg-slate-400"> </div>
          <p className="my-6 text-white">OR</p>
          <div className="flex-grow h-px bg-slate-400"> </div>
        </div> */}
        <div className="flex items-center gap-8 my-8 justify-center">
          {/* <div>
            <button className="py-4 px-2 my-5 border-2 border-grey-400 gap-4 flex items-center rounded-full w-{70%} text-3xl text-sky-600 font-bold">
              <img src={Google} alt="" width={50} />
              
              <div className="text-3xl text-blue-500 font-bold" >
                <p>Sign In With Google</p>
              </div>
            </button>
          </div> */}
        </div>
        <p className="my-6 text-white">
          Already have an account yet?{" "}
          <span className="text-[#317F67]">Log In</span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
