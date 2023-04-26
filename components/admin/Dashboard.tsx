import Header from "@/components/admin/Header";
import Editor from "@/components/admin/Editor";
import SideBar from "@/components/admin/Sidebar";

const AdminDashboard = () => {
  return (
    <div className="AdminDashboard">
      {/*@ts-expect-error Async JSX Component */}
      <Header />
      <div className="flex">
        <SideBar />
        <Editor />
      </div>
    </div>
  );
};

export default AdminDashboard;
