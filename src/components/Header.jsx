import logo from "../assets/images/logo1.png";

const Header = () => {
  return (
    <header className="flex p-2 justify-between text-[#317f67] py-4 w-[60%] mx-auto  px-14  bg-gray-300 rounded-full shadow-[0_0_4px_rgba(128,128,128)] text-2xl font-semibold mt-5 mb-10">
      <div>
        <h1>
          {" "}
          <img className="w-[80px]" src={logo} />
        </h1>
      </div>
      <div className="W-[80%] p-4 text-white ">
        <h1 className="text-xl font-bold">Dashboard</h1>
      </div>
    </header>
  );
};
export default Header;
