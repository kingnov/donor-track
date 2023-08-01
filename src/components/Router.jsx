import { BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "../pages/Home";
import LogInPage from "../pages/LogInPage";
import SignUpPage from "../pages/SignUpPage";

function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<LogInPage/>}/>
                <Route path="/signup" element={<SignUpPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router