function Donor() {
  return (
    <div className="flex">
        <DonorHead />
      <div className="flex-1">
      <Sidebar />
        <DashboardDetails />
      </div>
    </div>
  );
}
export default Donor;
