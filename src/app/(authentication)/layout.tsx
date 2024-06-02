"use client";
//import type { Metadata } from 'next'
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import AppHeader from "@/components/appHeader";
import Sidebar from "@/components/sidebar";
import Container from "react-bootstrap/Container";
//import './globals.css'

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        <div >
          <AppHeader />
          <div className="flex flex-1 main-content">
            <Sidebar route="Khach" />
            <Container>{children}</Container>
          </div>
        </div>
  );
}
