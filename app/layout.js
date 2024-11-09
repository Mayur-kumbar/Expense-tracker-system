"use client"

import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";

import ExpenseContextProvider from "@/lib/store/Expense-context";
import AuthContextProvider from "@/lib/store/Auth-context";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthContextProvider>
          <ExpenseContextProvider>
            <Navbar />
            {children}
          </ExpenseContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
