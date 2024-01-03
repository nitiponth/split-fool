import type { Metadata } from "next";
import "./globals.css";
import AppLayout from "./components/AppLayout";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return <AppLayout>{children}</AppLayout>;
}
