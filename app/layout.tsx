import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EU Data Dashboard",
  description: "Minimalistic insights into key European Union indicators."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
