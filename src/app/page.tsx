"use client";

import Link from "next/link";
import { PawPrint as Paw, ArrowRight } from "lucide-react";
import { useAuthContext } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import Loader from "@/components/common/Loader";

export default function Home() {
  const { authStatus } = useAuthContext();

  if (authStatus === "pending") {
    return (
      <div className="flex-1 grid place-items-center">
        <Loader />
      </div>
    );
  }

  const isAuthenticated = authStatus === "authorised";

  if (!isAuthenticated) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-primary-600 dark:text-primary-300 select-none px-4 text-center">
        <Paw className="mb-4 h-16 w-16 animate-bounce" />
        <h1 className="text-3xl font-extrabold mb-2">
          Welcome to FourPaws Admin
        </h1>
        <p className="mb-6 max-w-md">
          Please log in to manage pets, create profiles, and view pet forms.
        </p>
        <Button asChild>
          <Link href="/login">
            Login
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 flex flex-col items-center justify-center text-center max-w-4xl select-none">
      <div className="flex justify-center mb-8">
        <Paw className="h-16 w-16 text-primary-600 animate-bounce dark:text-primary-400" />
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide text-primary-900 dark:text-primary-200 mb-4">
        Manage Pets with FourPaws Admin
      </h1>

      <p className="text-lg text-primary-800 dark:text-primary-300 mb-8">
        Create new pet profiles, view submitted pet forms, and oversee your pet
        community effectively.
      </p>

      <div className="flex flex-wrap justify-center gap-6 w-full">
        {[
          { type: "Create Pet", icon: "🦴", href: "/create-pet" },
          { type: "Pet Forms", icon: "📋", href: "/pet-forms" },
          { type: "My Posts", icon: "📝", href: "/user-posts" },
        ].map(({ type, icon, href }) => (
          <Link
            key={type}
            href={href}
            className="flex flex-col items-center justify-center rounded-lg border-2 border-primary-600 bg-primary-100 p-6 text-primary-900 shadow-md transition hover:scale-105 hover:bg-primary-200 dark:border-primary-500 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800 sm:flex-1 sm:min-w-[180px]"
          >
            <div className="text-5xl mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2">{type}</h3>
            <p className="text-sm text-primary-800 dark:text-primary-400">
              Manage {type.toLowerCase()} with our intuitive interface.
            </p>
            <ArrowRight className="mt-3 h-5 w-5 text-primary-700 dark:text-primary-300" />
          </Link>
        ))}
      </div>
    </div>
  );
}
