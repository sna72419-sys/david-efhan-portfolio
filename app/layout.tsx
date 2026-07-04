import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "David N. Efhan — Full-Stack Web & Android Developer",
  description:
    "Portfolio of David N. Efhan, Information Technology graduate and full-stack web & Android developer specializing in Laravel, Next.js, and Java.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#0B0E14] text-[#E4E7EC]">
        {children}
      </body>
    </html>
  );
}
