import { BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "../pages/Home";
import LogInPage from "../pages/LogInPage";
import SignUpPage from "../pages/SignUpPage";
import DonorDashboard from "../pages/DonorDashboard";

function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<LogInPage/>}/>
                <Route path="/signup" element={<SignUpPage/>}/>
                <Route path="/dashboard" element={<DonorDashboard/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router