"use client"
import "@/styles/admin.page.css";
import { SessionProvider } from "next-auth/react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>
          <SessionProvider>
            {children}
          </SessionProvider>
        </main>
      </body>
    </html>
  );
}
