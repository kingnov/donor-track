import Google from "../assets/images/google.png";

function LogIn() {
  


  return (
    <div className="bg-[linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)),url('assets/images/upperHero.jpg')] bg-no-repeat  bg-cover h-[80vh]">
      
      <div className="w-[40%] text-center mx-auto  ">
        <h1 className="text-4xl font-bold my-8">Log in to your account</h1>
        <form action="" className="flex flex-col">
          <div className="flex flex-col gap-8">
        
            <input
              name="emailAddress"
        
              type="email"
              placeholder="EmailAddress"
              className="rounded-full py-4 px-6 border-2 border-gray-300"
            />
        
            <div className="flex border-2 items-center rounded-full py-4 px-6 bg-white ">
            <input
              name="passWord"
              type="password"
              placeholder="Password"
              className="outline-none w-[100%] "
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
            
            className="bg-[#317F67] rounded-full py-6 px-6 text-white text-2xl font-weight"
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
            <img src={Google} alt="" width={50} />
          </div>
          <div className="text-3xl text-blue-500 font-bold">
            <p>Log In With Google</p>
          </div>
        </div>
        <p className="my-6 text-white">
          Don't have an account yet?{" "}
          <span className="text-[#5eebc1] ">Sign Up free</span>
        </p>
      </div>
    </div>
  );
}

export default LogIn;