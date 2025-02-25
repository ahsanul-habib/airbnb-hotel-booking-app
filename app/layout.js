import Navbar from "@/app/components/Navbar";
import "./globals.css";
import "keep-react/css";
import { ToastWrapper } from "keep-react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hotel Booking App",
  description: "Find and book your perfect stay",
};

export default function RootLayout({ children,modal }) {
  return (
    <html lang="en">
      <body className={`flex flex-col min-h-screen ${inter.className}`}>
        <Navbar />
        {modal}
        {children}
        <ToastWrapper position="top-right"/>
      </body>
    </html>
  );
}
