import type { Metadata } from "next";
import "./globals.css";
import NoiseOverlay from "@/components/NoiseOverlay";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "David N. Efhan — Full-Stack Web & Android Developer",
  description:
    "Portfolio of David N. Efhan, Information Technology graduate and full-stack web & Android developer specializing in Laravel, Next.js, and Java.",
};

// Runs before paint to avoid a flash of the wrong theme on load.
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored === 'dark' || stored === 'light'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]" suppressHydrationWarning>
        <ThemeProvider>
          <NoiseOverlay />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
