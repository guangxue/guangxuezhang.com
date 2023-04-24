import "@/styles/main.page.css";
import MainHeader from "@/components/MainHeader";

import { Lora, Kanit } from "next/font/google";
const kanit = Kanit({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--skills-font",
});
const lora = Lora({
  subsets: ["latin"],
  variable: "--jumbo-font",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className={`${lora.variable} ${kanit.variable}`}>
          <div className="root-layout flex flex-col prose mx-auto max-w-none">
            <MainHeader />
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
