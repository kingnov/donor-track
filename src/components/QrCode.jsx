{
  /* <QRCode
    title="title"
    value="value"
    bgColor="background-color"
    fgcolor="foreground-color"
    level="level"
    size={number}
/> */
}

import { useState } from "react";
import QRCode from "react-qr-code";
import Nav from "./Nav";
import Footer from "./Footer";

function Qrcode() {

  return (
    <div>
<Nav/>
	<div className="flex flex-col items-center">
<h1 className="text-3xl font-semibold text-center text-[#317f67] underline uppercase decoration-wavy">
          Scan Qr-Code To Pay
        </h1>
    <div className="mt-10">
      <QRCode
        title="title"
        value="value"
        bgColor="white"
        fgcolor="black"
        
      />
    </div>
	</div>
  <Footer/>
    </div>


  );
}

export default Qrcode;
