import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import LogInPage from "../pages/LogInPage";
import SignUpPage from "../pages/SignUpPage";
import DonorDashboard from "../pages/DonorDashboard";
import OrgDashboard from "../pages/OrgDashboard";
import DonationForm from "../components/DonationForm";
import Qrcode from "./QrCode";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<DonorDashboard />} />
        <Route path="/orgDashboard" element={<OrgDashboard />} />
        <Route path="/donate/:org" element={<DonationForm />} />
        <Route path="/qr" element={<Qrcode/>} />
      

      </Routes>
    </BrowserRouter>
  );
}

export default Router;
