import Google from "../assets/images/google.png";


function SignUp() {
  return (
    
    <div className="bg-[ linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)),url('assets/images/upperHero.png')]  bg-no-repeat bg-cover h-[80vh]">
      <div className="w-[50%] text-center p-5 mx-auto ">
        <h1 className="text-4xl font-bold my-8 ">Create An Account</h1>
        <form action="" className="flex flex-col">
          <div className="flex justify-between my-8">
            <div>

              <input
                type="text"
                placeholder="First Name"
                className="rounded-full py-4 px-6 border-2 outline-none border-gray-300 w-[50%]"
                name="firstName"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Last Name"
                className="rounded-full py-4 px-6 border-2 outline-none border-gray-300 w-[50%]"
                
                name="lastName"
              />
            </div>
          </div>
          <div className="flex flex-col gap-8">

            <input
              type="email"
              placeholder="Email Address"
              className="rounded-full py-4 px-6 border-2 outline-none border-gray-300 w-[100%]"
            
              name="emailAddress"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="rounded-full py-4 px-6 border-2 outline-none border-gray-300 w-[100%]"
              name="phoneNumber"
            />
            <div className="flex border-2 items-center rounded-full py-4 px-6 ">
              <input
                type="pas"
                placeholder="Password"
                className="outline-none w-[100%]"
                name="passWord"
              />
            </div>
            <div className="flex border-2 items-center rounded-full py-4 px-6 ">
              <input
                type="password"
                placeholder="Confirm your password"
                className=" outline-none w-[100%]"
              />
            </div>
          </div>
          <div className="flex my-8 justify-between"></div>
          <button
            className="bg-teal-500 rounded-full py-4 px-2 text-white text-2xl font-bold"
          >
            Sign in
          </button>
        </form>
        <div className="flex items-center my[1em]">
          <div className="flex-grow h-px bg-slate-400"> </div>
          <p className="my-6">OR</p>
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
        <p className="my-6">
          Already have an account yet?{" "}
          <span className="text-[#45c9a1]">Sign In</span>
        </p>
      </div>
     
    </div>
  );
}

export default SignUp;