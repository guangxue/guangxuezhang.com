import Header from "@/components/admin/Header";
import type { User } from "next-auth";
import RouterProvider from "./RouterProvider";
import Sidebar from "./Sidebar";
import SidebarController from "./SidebarController";


export default function AdminDashboardController({ adminInfo }: { adminInfo: User }) {
  return (
    <div className="AdminDashBoard">
      {/*@ts-expect-error Async JSX Component */}
      <Header adminInfo={adminInfo} />
      <div className="flex h-screen">
        <RouterProvider>
          <Sidebar />
          <SidebarController />
        </RouterProvider>
      </div>
    </div>
  );
};