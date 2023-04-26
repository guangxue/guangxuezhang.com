import AdminSignInPage from "@/components/admin/SignInPage";
import UserSignInPage from "@/components/user/SignInPage";

export interface PageProps {
  params?: any
  searchParams?: { role: string }
}

export default function AuthSignInPage({ searchParams }: PageProps) {

  if (searchParams?.role === "admin") {
    return (
      <AdminSignInPage />
    )
  }

  if (searchParams?.role === "user") {
    return (
      <UserSignInPage />
    )
  }
}
