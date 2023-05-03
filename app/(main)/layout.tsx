import "@/styles/main.page.css";
import MainHeader from "@/components/MainHeader";

import { Lora, Kanit, Inconsolata } from "next/font/google";
const kanit = Kanit({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-kanit",
});
const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

const Incon = Inconsolata({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-inconsolata",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className={`${lora.variable} ${kanit.variable} ${Incon.variable}`}>
          <div className="root-layout flex flex-col prose mx-auto max-w-none">
            <MainHeader />
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
