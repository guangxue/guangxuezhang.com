import type { User } from "next-auth";
import SignOutButton from "../SignOutButton";

export default function UserDashboard({ userInfo }: { userInfo: User }) {

  return (
    <div>
      <header>
        <h1>User Panel</h1>
        <p>{userInfo.name}</p>
      </header>
      <div>
        <SignOutButton />
      </div>
    </div>
  );
}
