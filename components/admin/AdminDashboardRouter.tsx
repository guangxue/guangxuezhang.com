import Header from "@/components/admin/Header";
import RouterProvider from "./RouterProvider";
import Sidebar from "./Sidebar";
import SidebarController from "./SidebarController";


export default function AdminDashboardController() {
  return (
    <div className="AdminDashBoard">
      <Header />
      <div className="flex h-screen">
        <RouterProvider>
          <Sidebar />
          <SidebarController />
        </RouterProvider>
      </div>
    </div>
  );
};