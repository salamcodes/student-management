import Sidebar from "../../components/Sidebar";
import DashboardCards from "../../components/DashboardCards";

const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />

      <div className="flex-1 p-6 md:ml-64 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <DashboardCards />
      </div>
    </div>
  );
};

export default Dashboard;
