import Navbar from "@/components/Navbar";
import Sidebar from "./components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      {/* Fixed Navbar at Top */}
      <Navbar />

      {/* Content Area Below Navbar */}
      <div className="flex flex-row w-full pt-18">
        {/* Sidebar (left) */}
        <Sidebar />

        {/* Main Content (right) */}
        <main className="flex-1  overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
