import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NFL Playoff Bracket 2025-26",
  description: "Interactive NFL playoff bracket for the 2025-26 season",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
