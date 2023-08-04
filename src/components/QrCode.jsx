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

function Qrcode() {

  return (

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
  );
}

export default Qrcode;
