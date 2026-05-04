import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Should I Build This?",
  description: "Read-only shared report viewer for Should I Build This?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
