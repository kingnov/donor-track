import { useRef } from "react";
function Orghero(){
    const link = useRef();

  
    function myFunction() {
      const copyText = link.current;
      
      navigator.clipboard.writeText(copyText.textContent)
      .then(()=>{
  
        alert("Copied the text: " + copyText.textContent);
      })
      .catch(err=>{
        console.log(err)
      });
    }
    return (
      <div className="container bg-gray-300 mx-auto h-[60vh]">
        <h3 id="myInput" className="text-2xl">here is your organisation link</h3>
        <div  className="flex gap-1">
          <div ref={link} className="w-[50%] border-2">{`${location.origin}/donate/`}</div>
          <button  className="w-[80px] rounded-full border-2" onClick={myFunction}>copy link</button>
        </div>
        <div>
          <h2 className="text-3xl font-semibold text-center">
            Recent Donations Made
          </h2>
        </div>
      </div>
    );
}
export default Orghero