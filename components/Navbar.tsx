"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { PawPrint as Paw, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

export function Navbar({ className }: { className?: string }) {
  const { isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
    window.location.href = "/";
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-orange-300 dark:bg-orange-800 shadow-md transition-colors duration-500",
        className,
      )}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-0">
        <div className="flex items-center space-x-3">
          <Link
            href="/"
            className="flex items-center space-x-2 text-orange-900 dark:text-orange-200"
          >
            <Paw className="h-8 w-8" />
            <span className="font-bold text-xl tracking-wide select-none">
              FourPaws
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-orange-900 dark:text-orange-200 font-semibold">
          {isAuthenticated ? (
            <>
              {pathname === "/create-post" || pathname === "/" ? (
                <Link
                  href="/user-posts"
                  className="hover:bg-orange-400 dark:hover:bg-orange-700 px-3 py-1 rounded transition-colors"
                >
                  My Posts
                </Link>
              ) : (
                <Link
                  href="/create-post"
                  className="hover:bg-orange-400 dark:hover:bg-orange-700 px-3 py-1 rounded transition-colors"
                >
                  Create Post
                </Link>
              )}
              <Link
                href="/pet-forms"
                className="hover:bg-orange-400 dark:hover:bg-orange-700 px-3 py-1 rounded transition-colors"
              >
                Pet Forms
              </Link>
              <button
                onClick={handleLogout}
                className="hover:bg-orange-400 dark:hover:bg-orange-700 px-3 py-1 rounded transition-colors"
              >
                Logout
              </button>
            </>
          ) : null}
          <ThemeToggle />
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-4 text-orange-900 dark:text-orange-200">
          <ThemeToggle />
          <button
            aria-label="Toggle Menu"
            className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-orange-200 dark:bg-orange-900 text-orange-900 dark:text-orange-200 font-semibold px-4 py-2 space-y-2 shadow-lg">
          {isAuthenticated ? (
            <>
              {pathname === "/create-post" || pathname === "/" ? (
                <Link
                  href="/user-posts"
                  className="block px-3 py-2 rounded hover:bg-orange-400 dark:hover:bg-orange-700 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Posts
                </Link>
              ) : (
                <Link
                  href="/create-post"
                  className="block px-3 py-2 rounded hover:bg-orange-400 dark:hover:bg-orange-700 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Create Post
                </Link>
              )}
              <Link
                href="/pet-forms"
                className="block px-3 py-2 rounded hover:bg-orange-400 dark:hover:bg-orange-700 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pet Forms
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded hover:bg-orange-400 dark:hover:bg-orange-700 transition-colors"
              >
                Logout
              </button>
            </>
          ) : null}
        </nav>
      )}
    </header>
  );
}
