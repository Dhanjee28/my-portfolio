import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dhanjee Tiwari | Backend Engineer",
  description:
    "Backend-focused software engineer portfolio covering Node.js, TypeScript, production debugging, API design, and RailInfo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="light-mode">{children}</body>
    </html>
  );
}
