import type { Metadata } from "next";
import "./globals.css";
import { Nunito, Quicksand } from "next/font/google";
import Navbar from "../components/Navbar";
import { Toaster } from "sonner";
import AuthProvider from "../porviders/AuthProvider";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Colab App",
  description: "A Colab Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="forest">
      <body className={`${quicksand.variable} ${nunito.variable}`}>
        <AuthProvider>
          <Navbar />
          <Toaster position="top-center" />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
