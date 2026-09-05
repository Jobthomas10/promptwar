import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VerifyAI | Don't Trust It. Verify It.",
  description: "Advanced GenAI-powered digital media verification and forensics platform for detecting, understanding, tracing, and verifying synthetic or manipulated images, audio, and video.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-obsidian text-slate-100 min-h-screen flex flex-col font-sans antialiased selection:bg-cyber-cyan selection:text-obsidian">
        {children}
      </body>
    </html>
  );
}
