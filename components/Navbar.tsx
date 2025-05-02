"use client"
import Link from "next/link";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { PawPrint as Paw } from "lucide-react";
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from "next/navigation";

export function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("auth_token");
        setIsAuthenticated(!!token);
      }
    };
  
    checkAuth(); // Initial check
    window.addEventListener("storage", checkAuth); // Listen for token changes
  
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    window.location.href = '/'; // Redirect to home page
    setIsAuthenticated(false)
    // router.push("/")
    // router.refresh()
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center max-w-7xl m-auto">
        <Link href="/" className="flex items-center space-x-3 mr-6">
          <Paw className="h-8 w-8 text-primary" />
          <span className="font-bold text-xl tracking-tight">FourPaws</span>
        </Link>
       
        <div className="flex-1 flex items-center justify-end space-x-4">
          {isAuthenticated && (
            <>
              {pathname === '/create-post' || pathname === "/" ? (
                <Link href="/user-posts" className="text-sm font-medium hover:text-primary transition-colors">
                  My Posts
                </Link>
              ) : (
                <Link href="/create-post" className="text-sm font-medium hover:text-primary transition-colors">
                  Create Post
                </Link>
              )}
              <Link href="/pet-forms" className="text-sm font-medium hover:text-primary transition-colors">
                Pet Forms
              </Link>
              <button onClick={handleLogout} className="text-sm font-medium hover:text-primary transition-colors">
                Logout
              </button>
            </>
          )}
            <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}