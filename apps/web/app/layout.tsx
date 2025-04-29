import type { Metadata } from "next";
import "./globals.css";
import { Nunito, Quicksand } from "next/font/google";

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
    <html lang="en" data-theme="black">
      <body className={`${quicksand.variable} ${nunito.variable}`}>
        {children}
      </body>
    </html>
  );
}
