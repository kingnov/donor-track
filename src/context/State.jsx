
import { useState } from "react";
import { createContext } from "react";
export const StateContext = createContext();

function AuthenticationButtons({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <StateContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
      {children}
    </StateContext.Provider>
  );
}
export default AuthenticationButtons;
