import DashboardCharts from "../components/DashboardCharts";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <DashboardCharts />
    </div>
  );
}
