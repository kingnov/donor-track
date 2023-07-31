function Hero() {
  return (
    <div>
      <div className="bg-[url('assets/images/upperHero.jpg')] bg-no-repeat w-[100%] h-[70vh] bg-center bg-cover  ">
        <div className="mt-4 text-[#fff] items-center flex flex-col">
          <h1>A Little Care Can Change the World</h1>
          <button className="p-2 text-[#317f67] py-4 w-[40%] mx-auto  px-14 font-bold rounded-full shadow-[0_0_4px_rgba(128,128,128)] text-2xl font-semibold mt-5 mb-10">
            Start a Fundraising
          </button>
          <p>For Individuals and charities. No startup fees. No hidden fees.</p>
        </div>
      </div>
      <div></div>
      <div>
        <p>
          Trusted by thousands of schools,
          <br />
          <span className="text-[#45c9a1]"> Churches and Organisation</span>
        </p>
        <ul>
          <div>
            <li>Secure Forms & Campaign Pages</li>
            <li>Complete Customization</li>
            <li>5 Minutes To Signup</li>
            <li>Intergrated With Ease</li>
          </div>
          <div>
            <li>No Setup Fees or Hidden Costs</li>
            <li>No Limited function</li>
            <li>No contracts</li>
          </div>
        </ul>
      </div>
    </div>
  );
}
export default Hero;
