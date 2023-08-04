import { Link } from "react-router-dom";
function OrganisationForm() {
   
    return (
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden ">
        <div className="w-full p-6 m-auto bg-gray-200 rounded-md shadow-xl shadow-gray-300 ring-2 text-[#317f67] lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-[#317f67] underline uppercase decoration-wavy">
            Fill in The Form
          </h1>
          <form className="mt-6">
            <div className="mb-2">
              <label>
                <span className="text-gray-700">Donor's Name</span>
                <input
                  type="text"
                  name="name"
                  className="
  
              w-full
              block px-16 py-2 mt-2
              border-gray-300
              rounded-md
              shadow-sm
              focus:border-indigo-300
              focus:ring
              focus:ring-indigo-200
              focus:ring-opacity-50
            "
                  placeholder=" Enter Ypur Full Name"
                />
              </label>
            </div>
            <div className="mb-2">
              <label>
                <span className="text-gray-700">Account Number</span>
                <input
                  
                  type="text"
                  name="name"
                  
                  className="
  
              w-full
              block px-16 py-2 mt-2
              border-gray-300
              rounded-md
              shadow-sm
              focus:border-indigo-300
              focus:ring
              focus:ring-indigo-200
              focus:ring-opacity-50
            "
                />
              </label>
            </div>
            <div className="mb-2">
              <label>
                <span className="text-gray-700">Amount </span>
                <input
                  type="text"
                  name="name"
                  className="
  
              w-full
              block px-16 py-2 mt-2
              border-gray-300
              rounded-md
              shadow-sm
              focus:border-indigo-300
              focus:ring
              focus:ring-indigo-200
              focus:ring-opacity-50
            "
                  placeholder="amount"
                />
              </label>
            </div>
            <div className="mb-2">
              <label>
                <span className="text-gray-700">Reason</span>
                <input
                  name="name"
                  type="text"
                  className="
              block
              w-full
              mt-2 px-16 py-2
              border-gray-300
              rounded-md
              shadow-sm
              focus:border-indigo-300
              focus:ring
              focus:ring-indigo-200
              focus:ring-opacity-50
            "
                  placeholder="Enter Your Phone Number"
                  required
                />
              </label>
            </div>
  
            <div class="mb-6">
              <button
                type="submit"
                className="
              h-10
              px-5
              text-indigo-100
              bg-green-700
              rounded-lg
              transition-colors
              duration-150
              focus:shadow-outline
              hover:bg-gray-600
            "
              >
                <Link to="/qr">  Submit</Link>
              
              </button>
            </div>
            <div></div>
          </form>
        </div>
      </div>
    );
  }
  
  export default OrganisationForm;
  