import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aadhik Babu Metals | Brassware for every ritual",
  description: "Handpicked brass and metal pooja essentials from Aadhik Babu Metals.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
