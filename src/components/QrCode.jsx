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
    <div>
      <QRCode
        title="title"
        value="value"
        bgColor="white"
        fgcolor="black"
        
      />
    </div>
  );
}

export default Qrcode;
