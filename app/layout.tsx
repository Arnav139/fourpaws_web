import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/theme/ThemeProvider";
// import Sidebar from "@/components/organisms/Sidebar";
// import ThemeToggle from "@/components/common/ThemeToggle";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";
import { Sidebar } from "@/components/Sidebar";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FourPaws - Pet Community",
  description: "Share and connect with pet lovers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-orange-50 dark:bg-orange-950 transition-colors duration-500`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="flex flex-col min-h-screen md:flex-row">
              <Sidebar className="bg-orange-200 dark:bg-orange-900 md:h-screen md:w-64 flex-shrink-0" />
              <div className="flex flex-col flex-1">
                {/* <Navbar /> */}
                <main className="flex-grow overflow-y-auto max-h-screen px-4 py-6">
                  {children}
                </main>
              </div>
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
