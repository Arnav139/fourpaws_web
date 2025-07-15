"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, PawPrint as Paw, LogOut } from "lucide-react";

import { cn } from "@/lib/utils";
import { useState } from "react";
// import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "./theme/ThemeToggle";

export const Sidebar = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  console.log({ isAuthenticated });

  const links = [
    { href: "/create-pet", label: "Create Pet" },
    { href: "/pet-forms", label: "Pet Forms" },
    { href: "/user-posts", label: "My Posts" },
  ];

  async function handleLogout() {
    await logout();
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  }

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center justify-between bg-orange-300 dark:bg-orange-800 p-4 shadow-md sticky top-0 z-50">
        <Link
          href="/"
          className="flex items-center space-x-2 text-orange-900 dark:text-orange-200 font-bold text-xl tracking-tight select-none"
        >
          <Paw className="h-8 w-8" />
          <span>FourPaws</span>
        </Link>
        <button
          aria-label="Toggle menu"
          onClick={() => setIsOpen(!isOpen)}
          className="text-orange-900 dark:text-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-600 rounded"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <nav
        className={cn(
          `fixed inset-y-0 left-0 transform bg-orange-200 dark:bg-orange-900 w-64 p-6 pt-10 overflow-y-auto transition-transform duration-300 ease-in-out
           md:relative md:translate-x-0 md:flex flex-col md:h-screen text-orange-900 dark:text-orange-200`,
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
                    ? "bg-orange-500 dark:bg-orange-700 text-orange-50"
                    : "hover:bg-orange-400 dark:hover:bg-orange-600 hover:text-orange-100",
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
          {isAuthenticated ? (
            <button
              onClick={() => handleLogout()}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-lg font-semibold rounded-md bg-orange-500 dark:bg-orange-700 text-orange-50 hover:bg-orange-600 dark:hover:bg-orange-800 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          ) : (
            <Link
              href="/login"
              className="w-full block text-center px-4 py-2 text-lg font-semibold rounded-md bg-orange-500 dark:bg-orange-700 text-orange-50 hover:bg-orange-600 dark:hover:bg-orange-800 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
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

// import { PawPrint as Paw, Menu } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { ThemeToggle } from "@/components/atoms/ThemeToggle";
// import { useAuth } from "@/contexts/AuthContext";

// export function Navbar({ className }: { className?: string }) {
//   const { isAuthenticated, logout } = useAuth();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const pathname = usePathname();

//   const handleLogout = async () => {
//     await logout();
//     setIsMobileMenuOpen(false);
//     window.location.href = "/";
//   };

//   return (
//     <header
//       className={cn(
//         "sticky top-0 z-50 bg-orange-300 dark:bg-orange-800 shadow-md transition-colors duration-500",
//         className
//       )}
//     >
//       <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-0">
//         <div className="flex items-center space-x-3">
//           <Link href="/" className="flex items-center space-x-2 text-orange-900 dark:text-orange-200">
//             <Paw className="h-8 w-8" />
//             <span className="font-bold text-xl tracking-wide select-none">FourPaws</span>
//           </Link>
//         </div>

//         <nav className="hidden md:flex items-center space-x-6 text-orange-900 dark:text-orange-200 font-semibold">
//           {isAuthenticated ? (
//             <>
//               {(pathname === "/create-post" || pathname === "/") ? (
//                 <Link
//                   href="/user-posts"
//                   className="hover:bg-orange-400 dark:hover:bg-orange-700 px-3 py-1 rounded transition-colors"
//                 >
//                   My Posts
//                 </Link>
//               ) : (
//                 <Link
//                   href="/create-post"
//                   className="hover:bg-orange-400 dark:hover:bg-orange-700 px-3 py-1 rounded transition-colors"
//                 >
//                   Create Post
//                 </Link>
//               )}
//               <Link
//                 href="/pet-forms"
//                 className="hover:bg-orange-400 dark:hover:bg-orange-700 px-3 py-1 rounded transition-colors"
//               >
//                 Pet Forms
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="hover:bg-orange-400 dark:hover:bg-orange-700 px-3 py-1 rounded transition-colors"
//               >
//                 Logout
//               </button>
//             </>
//           ) : null}
//           <ThemeToggle />
//         </nav>

//         {/* Mobile menu button */}
//         <div className="md:hidden flex items-center space-x-4 text-orange-900 dark:text-orange-200">
//           <ThemeToggle />
//           <button
//             aria-label="Toggle Menu"
//             className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600"
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           >
//             <Menu className="h-6 w-6" />
//           </button>
//         </div>
//       </div>

//       {/* Mobile menu panel */}
//       {isMobileMenuOpen && (
//         <nav className="md:hidden bg-orange-200 dark:bg-orange-900 text-orange-900 dark:text-orange-200 font-semibold px-4 py-2 space-y-2 shadow-lg">
//           {isAuthenticated ? (
//             <>
//               {(pathname === "/create-post" || pathname === "/") ? (
//                 <Link
//                   href="/user-posts"
//                   className="block px-3 py-2 rounded hover:bg-orange-400 dark:hover:bg-orange-700 transition-colors"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   My Posts
//                 </Link>
//               ) : (
//                 <Link
//                   href="/create-post"
//                   className="block px-3 py-2 rounded hover:bg-orange-400 dark:hover:bg-orange-700 transition-colors"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   Create Post
//                 </Link>
//               )}
//               <Link
//                 href="/pet-forms"
//                 className="block px-3 py-2 rounded hover:bg-orange-400 dark:hover:bg-orange-700 transition-colors"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 Pet Forms
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="w-full text-left px-3 py-2 rounded hover:bg-orange-400 dark:hover:bg-orange-700 transition-colors"
//               >
//                 Logout
//               </button>
//             </>
//           ) : null}
//         </nav>
//       )}
//     </header>
//   );
// }
