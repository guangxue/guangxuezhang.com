import Header from "@/components/admin/Header";
import Editor from "@/components/admin/Editor";
import SideBar from "@/components/admin/Sidebar";
import type { User } from "next-auth";

const AdminDashboard = ({ adminInfo }: { adminInfo: User }) => {
  return (
    <div className="AdminDashboard">
      {/*@ts-expect-error Async JSX Component */}
      <Header adminInfo={adminInfo} />
      <div className="flex">
        <SideBar />
        <Editor />
      </div>
    </div>
  );
};

export default AdminDashboard;
