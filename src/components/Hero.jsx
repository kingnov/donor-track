import org from "../assets/images/org.jpeg";
import check from "../assets/images/check.png";
import muliro from "../assets/images/muliro.jpg";
import vinny from "../assets/images/vinny.png";
import Nila2 from "../assets/images/Nila2.jpeg"

function Hero() {
  return (
    <div className="">
      <div className="bg-[linear-gradient(rgb(0,128,0,.5),rgba(128,128,128,.3)),url('assets/images/upperHero.jpg')] bg-no-repeat w-[100%] h-[70vh] bg-left-bottom bg-cover mix-blend-overlay">
        <div className=" text-[#fff] items-center justify-center flex flex-col h-[100%]">
          <h1 className="text-[3rem] font-bold">
            A Little Care Can Change the World
          </h1>
          <p className="text-[2rem] font-bold">
            For Individuals and charities. No startup fees. No hidden fees.
          </p>
          <button className="p-2 text-[#317f67] py-4 w-[40%] mx-auto bg-gray-300 px-14 rounded-full shadow-[0_0_4px_rgba(128,128,128)] text-2xl font-semibold mt-5 mb-10">
            <a href="/donate/:org">Start a Fundraising</a>
            
          </button>
        </div>
      </div>

      <div className="mx-auto container h-[30vh] p-2">
        <h1 className="text-[3rem] font-bold text-center ">
          A Fundraising Solution for All
        </h1>
        <p className="text-[2rem] text-center  ">
          Whether you’re a seasoned expert in online fundraising or providing
          your donors an online giving option for <b />
          the first time, Donar-Track makes it simple for donors to support your
          cause. Our donations forms <b />
          provide a beautiful avenue to collect donations digitally by helping
          donors to track their donations.
        </p>
      </div>
      <div className="flex container mx-auto h-[50vh]">
        <div className="container mx-auto">
          <p className="text-[3rem] font-bold">
            Trusted by thousands of schools,
            <br />
            <span className=""> Churches and Organisation</span>
          </p>
          <div className="flex text-[1.5rem] mx-auto gap-2">
            <ul className="flex flex-col gap-2">
              <li className="flex gap-2 items-center">
                <img src={check} alt="organisation" className="w-7 h-7" />
                <span>Secure Forms & Campaign Pages</span>
              </li>
              <li className="flex gap-2 items-center">
                <img src={check} alt="organisation" className="w-7 h-7" />
                <span>Complete Customization</span>
              </li>
              <li className="flex gap-2 items-center">
                <img src={check} alt="organisation" className="w-7 h-7" />
                <span>5 Minutes To Signup</span>
              </li>
              <li className="flex gap-2 items-center">
                <img src={check} alt="organisation" className="w-7 h-7" />
                <span>Intergrated With Ease</span>
              </li>
            </ul>
            <ul className="flex flex-col gap-2">
              <li className="flex gap-2 items-center">
                <img src={check} alt="organisation" className="w-7 h-7" />
                <span>No Setup Fees or Hidden Costs</span>
              </li>
              <li className="flex gap-2 items-center">
                <img src={check} alt="organisation" className="w-7 h-7" />
                <span>No Limited function</span>
              </li>
              <li className="flex gap-2 items-center">
                <img src={check} alt="organisation" className="w-7 h-7" />
                <span>No contracts</span>
              </li>
            </ul>
          </div>
          <button className="p-2 text-[#317f67] py-4 w-[40%] mx-auto  px-14   bg-gray-300 rounded-full shadow-[0_0_4px_rgba(128,128,128)] text-2xl font-semibold mt-5 mb-10">
            Signup free
          </button>
        </div>
        <div>
          <img src={org} alt="organisation" className=" object-contain flex " />
        </div>
      </div>

      <h2 className="text-center font-bold text-3xl m-[2em]">
        Innovative Minds Coming Together For Donor-Track
      </h2>
      <div className="flex container mx-auto justify-center gap-[5em]">
        <div className=" border-2 w-[350px] p-4 bg-white-300">
          <div>
            {" "}
            <img src={muliro} alt="muliro" className="w-[100%] h-[320px] rounded-full" />
          </div>
          <h3 className="text-center">John Doe - Lead Developer</h3>
          <p className="text-center">
            Tech enthusiast with a passion for coding. Turning ideas into
            reality, one line of code at a time.
          </p>
        </div>
        <div className=" border-2 w-[350px] p-4 bg-white-300">
          <div>
            {" "}
            <img src={vinny} alt="Vinny" className="w-[100%] h-[320px] rounded-full" />
          </div>
          <h3 className="text-center">Jane Smith - UX/UI Designer</h3>
          <p className="text-center">
            Creative designer crafting seamless user experiences. Transforming
            empathy into intuitive interfaces.
          </p>
        </div>
        <div className=" border-2 w-[350px] p-4 bg-white-300">
          <div>
            {" "}
            <img src={Nila2} alt="Nila" className="w-[100%] h-[320px] rounded-full" />
          </div>

          <h3 className="text-center">Mike Johnson - Project Manager</h3>
          <p className="text-center">
            Detail-oriented leader orchestrating the team's efforts. Ensuring
            smooth progress towards our common vision.
          </p>
        </div>
      </div>
    </div>
  );
}
export default Hero;
