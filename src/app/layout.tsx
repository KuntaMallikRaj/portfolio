import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/data";
import Preloader from "@/components/Preloader";
import ConstellationBackground from "@/components/ConstellationBackground";
import CursorGlow from "@/components/CursorGlow";
import ScrollProgress from "@/components/ScrollProgress";
import CommandPalette from "@/components/CommandPalette";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.title}`,
  description: profile.tagline,
  authors: [{ name: profile.name }],
  keywords: [
    "Kunta Mallik Raj",
    "Backend Engineer",
    "Event-Driven Architecture",
    "Distributed Systems",
    "FastAPI",
    "Software Engineer",
  ],
  openGraph: {
    title: `${profile.name} — ${profile.title}`,
    description: profile.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Preloader />
        <ConstellationBackground />
        <CursorGlow />
        <ScrollProgress />
        <CommandPalette />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
