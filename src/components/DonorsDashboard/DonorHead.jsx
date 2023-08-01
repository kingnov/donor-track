const Header = () => {
  return (
    <header className="flex">
      <h1>
        {" "}
        <img className="w-[80px]" src={logo} />
      </h1>
      <div className="bg-gray-800 p-4 text-white">
        <h1 className="text-xl font-bold">Donor Dashboard</h1>
      </div>
    </header>
  );
};
export default Header;
