"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, PawPrint as Paw, LogOut } from "lucide-react";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { useAuthContext } from "@/contexts/AuthContext";
import { Button } from "./ui/button";

const links = [
  { href: "/pets/create", label: "Create Pet" },
  { href: "/posts/create", label: "Create Post" },
  { href: "/pets", label: "Pet Forms" },
  { href: "/posts", label: "My Posts" },
];

export const Sidebar = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { authStatus, logout } = useAuthContext();

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center justify-between bg-[var(--primary)] text-[var(--primary-foreground)] p-4 shadow-md sticky top-0 z-50">
        <Link
          href="/"
          className="flex items-center space-x-2 font-bold text-xl tracking-tight select-none"
        >
          <Paw className="h-8 w-8" />
          <span>FourPaws</span>
        </Link>
        <button
          aria-label="Toggle menu"
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none focus:ring-2 ring-[var(--secondary)] rounded"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <nav
        className={cn(
          `fixed inset-y-0 left-0 transform bg-[var(--accent)] text-[var(--accent-foreground)] w-64 p-6 pt-10 overflow-y-auto transition-transform duration-300 ease-in-out
           md:relative md:translate-x-0 md:flex flex-col md:h-screen`,
          isOpen ? "translate-x-0" : "-translate-x-full",
          className,
        )}
      >
        {/* Logo and Title */}
        <Link
          href="/"
          className="mb-10 hidden md:flex items-center space-x-3 select-none"
        >
          <Paw className="h-10 w-10" />
          <span className="text-3xl font-extrabold tracking-widest">
            FourPaws
          </span>
        </Link>

        {/* Navigation Links */}
        <ul className="flex flex-col space-y-3 mb-8 mt-20 md:mt-0">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "block rounded-md px-4 py-2 text-lg font-semibold transition-colors duration-200",
                  pathname === href
                    ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                    : "hover:bg-[var(--secondary)] hover:text-[var(--secondary-foreground)]",
                )}
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          {/* Theme Toggle */}
          <div className="mb-6">
            <ThemeToggle />
          </div>

          {/* Logout */}
          {authStatus === "authorised" ? (
            <Button onClick={logout} variant="destructive">
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </Button>
          ) : (
            authStatus === "unauthorised" && (
              <Link
                href="/login"
                className="w-full block text-center px-4 py-2 text-lg font-semibold rounded-md bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--secondary-foreground)] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )
          )}
        </div>
      </nav>

      {/* Backdrop for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
