"use client";
import AdminSignInPage from "@/components/admin/SignInPage";
import UserSignInPage from "@/components/user/SignInPage";
import { useSearchParams } from "next/navigation";

export default function AuthSignInPage() {
  const params = useSearchParams();
  const role = params.get("role");

  if (role === "admin") {
    return <AdminSignInPage />;
  }

  if (role === "user") {
    return <UserSignInPage />;
  }
}
