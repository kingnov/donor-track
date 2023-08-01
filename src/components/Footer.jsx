import Email from "../assets/images/email.png";
import Phone from "../assets/images/phone.png";
import Facebook from "../assets/images/facebook.png";
import Instagram from "../assets/images/instagram.png";
import Twitter from "../assets/images/twitter.png";
import logo from "../assets/images/logo1.png"

function Footer() {
  return (
    <div className=" bg-gray-100">
      <div>
        <div className="text-center py-12">
          <h2 className="text-5xl">Subscribe & get up to 20% OFF</h2>
        </div>
        <div className="flex gap-28 mx-auto justify-center pb-12">
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              className="border-2    rounded-full border-[#317f67] outline-none w-96 p-5"
            />
          </div>
          <div>
            <button className="bg-[#317f67] rounded-full p-5 text-white w-48 font-bold">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className=" container mx-auto flex gap-56">
        <div className="w-60">
          <p>
            All rights reserved. The content and materials on this website,
            including but not limited to text, images, graphics, logos, and v
            are the property of [Donor-Track] and are protected by copyright
            laws.
          </p>
        </div>

        <div>
          <ul>
            <li>
              <h3 className="text-2xl py-2">Donation Process</h3>
            </li>
            <li>Select Your Donation Method</li>
            <li>Enter Donation Amount</li>
            <li>Provide Contact Information</li>
            <li>Make Payment</li>
            <li>Donation Acknowledgment</li>
            <li>Tracking Your Donation</li>
          </ul>
        </div>
        <div>
          <ul>
            <li>
              <h3 className="text-2xl py-2">Help</h3>
            </li>
            <li>Customer Support</li>
            <li>Terms& Conditions</li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div>
          <h3 className="text-2xl py-2">Contact Us</h3>
          <div className="flex flex-col gap-3">
            <div className="flex gap-4">
              <div>
                <img src={Email} alt="" width={30} />
              </div>
              <div>
                <p>contact@donortrack.com</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div>
                <img src={Phone} alt="" width={30} />
              </div>
              <div>
                <p>254-700-333-333</p>
              </div>
            </div>
          </div>
          <div>
            <p className="py-2">Follow Us</p>
          </div>
          <div className="flex gap-5">
            <div>
              <img src={Facebook} alt="" width={30} />
            </div>
            <div>
              <img src={Instagram} alt="" width={30} />
            </div>
            <div>
              <img src={Twitter} alt="" width={30} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
      <p>
        <link rel="stylesheet" href="" />
        Privacy Policy Terms of Use
      </p>
      <h1> <img className="w-[80px]" src={logo} /></h1>
      <p className="text-center">Copyright © 2023 [Donor-Track].</p>
      </div>
    </div>
  );
}

export default Footer;
