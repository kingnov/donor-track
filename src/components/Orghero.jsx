import { useRef, useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { copyLink } from "../../Helpers";
import { Link } from "react-router-dom";

function Orghero() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    (async function () {
      const q = query(
        collection(db, "users"),
        where("emailaddress", "==", localUser.email)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        // console.log(doc.data());
        setUser(doc.data());

        // console.log(doc.id, " => ", doc.data());
      });
    })();
  });

  const link = useRef();
  function myFunction(e) {
    console.log(e.target.textContent.toLowerCase());
    if (e.target.textContent.toLowerCase() === "copy link") {
      e.target.textContent = "copied link";
    }
    const copyText = link.current;

    navigator.clipboard
      .writeText(copyText.textContent)
      .then(() => {
        // alert("Copied the text: " + copyText.textContent);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="container  mx-auto h-[60vh] py-4">
      {/* {console.log(user)} */}
      <div className="flex gap-3">
        <div className="w-[70%]">
          <h3 id="myInput" className="text-2xl mb-2">
            here is your organisation link
          </h3>
          <div className="flex gap-1">
            <div ref={link} className="w-[50%] border-2 py-4 px-2">{`${
              location.origin
            }/donate/${
              user.organizationName ? user.organizationName.toLowerCase() : ""
            }`}</div>
            <button
              className="w-[90px] border-2"
              onClick={(e) => {
                myFunction(e);
              }}
            >
              copy link
            </button>
          </div>
          {/* <div className="flex gap-2"> */}
          <div>
            <div className="mt-4">
              <h2 className="text-3xl font-semibold text-center">
                Recent Donations Made
              </h2>
            </div>
            <div className="flex justify-between font-semibold text-gray-600   w-[53%]">
              <p>Name</p>
              <p>Amount</p>
            </div>
            <div className="flex justify-between border-t-[1px] border-gray-400 py-2">
              <p>Moses Muliro</p>
              <p>KSh 300000</p>
              <button className="bg-[#15803D] text-white px-3 py-2 rounded-md">
              <Link to="/orgForm">
                Use Donation
                </Link>
              </button>
            </div>
            <div className="flex justify-between border-t-[1px] border-gray-400 py-2">
              <p>Neala Achieng</p>
              <p>KSh 300000</p>
              <button className="bg-[#15803D] text-white px-3 py-2 rounded-md">
              <Link to="/orgForm">
                Use Donation
                </Link>
              </button>
            </div>
            <div className="flex justify-between border-t-[1px] border-gray-400 py-2">
              <p>Antony Ng'ang'a</p>
              <p>KSh 300000</p>
              <button className="bg-[#15803D] text-white px-3 py-2 rounded-md">
              <Link to="/orgForm">
                Use Donation
                </Link>
              </button>
            </div>
            <div className="flex justify-between border-t-[1px] border-gray-400 py-2">
              <p>Cynthia Oduor</p>
              <p>KSh 300000</p>
              <button className="bg-[#15803D] text-white px-3 py-2 rounded-md">
                <Link to="/orgForm">Use Donation</Link>      
              </button>
            </div>
          </div>
        </div>
        <div className="w-[30%] h-[40vh] bg-[#52bf7a]">
          <div>
            <h2 className="text-3xl font-semibold text-center">
              Transaction History
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Orghero;
