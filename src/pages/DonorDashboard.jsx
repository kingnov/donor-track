import DashboardDetails from "../components/DonorsDashboard/DashboardDetails";
import Header from "../components/DonorsDashboard/Header";
import Sidebar from "../components/DonorsDashboard/Sidebar";

function DonorDashboard() {
  return (
    <div className="flex">
      <Header/>
      <div className="flex-1">
        <Sidebar />
        <DashboardDetails />
      </div>
    </div>
  );
}
export default DonorDashboard;
