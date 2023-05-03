import AdminDashboardRouter from "@/components/admin/AdminDashboardRouter";
import UserDashboard from "@/components/user/Dashboard";
import { authOption } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function Dashboard() {
  const session = await getServerSession(authOption);
  if (session?.user.role === "Admin") {
    return <AdminDashboardRouter adminInfo={session.user} />;
  }
  if (session?.user.role === "User") {
    return <UserDashboard userInfo={session.user} />;
  }
  if (session === null) {
    return (
      <div className="prose flex flex-col justify-center items-center m-10">
        <h1>Welcome back</h1>
        <div>
          <a href={process.env.NEXTAUTH_URL + "signin?role=admin"}>
            Sign In as Admin
          </a>
        </div>
        <div>
          <a href={process.env.NEXTAUTH_URL + "signin?role=user"}>
            Sign In as _User
          </a>
        </div>
      </div>
    );
  }

}
