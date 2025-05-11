import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FourPaws - Pet Community",
  description: "Share and connect with pet lovers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen md:flex-row antialiased transition-colors duration-500`}
      >
        <Providers>
          <Sidebar className="md:h-screen md:w-64 flex-shrink-0" />

          <main className="flex-grow overflow-y-auto max-h-screen flex px-4 py-6">
            {children}
          </main>

          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
