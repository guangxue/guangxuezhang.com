"use client";
import Header from "@/components/admin/Header";
import RouterProvider from "@/components/admin/RouterProvider";
import Sidebar from "@/components/admin/Sidebar";
import SidebarController from "@/components/admin/SidebarController";

export default function AdminDashboardGateway() {
  return (
    <div className="AdminDashBoardGateway">
      <RouterProvider>
        <Header />
        <div className="flex h-screen">
          <Sidebar />
          <SidebarController />
        </div>
      </RouterProvider>
    </div>
  );
};