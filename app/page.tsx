"use client";

import Link from "next/link";
import { PawPrint as Paw, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import * as clientApi from "@/services/clientApi";

const Loading = () => (
  <div className="flex min-h-screen items-center justify-center text-orange-600 dark:text-orange-400">
    Loading...
  </div>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="flex min-h-screen items-center justify-center text-red-600 dark:text-red-400">
    <p>{message}</p>
  </div>
);

const EmptyState = () => (
  <div className="flex min-h-screen flex-col items-center justify-center text-orange-700 dark:text-orange-300 select-none px-4 text-center">
    <Paw className="mb-4 h-16 w-16 animate-bounce" />
    <h1 className="text-3xl font-extrabold mb-2">Welcome to FourPaws Admin</h1>
    <p className="mb-6 max-w-md text-center">
      Get started by managing pets, creating profiles, and viewing pet forms.
    </p>
    <Link
      href="/create-pet"
      className="inline-flex items-center rounded bg-orange-600 px-6 py-3 text-white shadow-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
    >
      Create a Pet
      <ArrowRight className="ml-2 h-5 w-5" />
    </Link>
  </div>
);

export default function Home() {
  const [authStatus, setAuthStatus] = useState<{
    isAuthenticated: boolean;
    user: any | null;
    token: string | null;
  } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await clientApi.getAuthStatus();
        setAuthStatus(res);
      } catch {
        setAuthStatus({ isAuthenticated: false, user: null, token: null });
      }
    })();
  }, []);

  if (!authStatus) {
    return <Loading />;
  }

  const { isAuthenticated } = authStatus;

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center text-orange-700 dark:text-orange-300 select-none px-4 text-center">
        <Paw className="mb-4 h-16 w-16 animate-bounce" />
        <h1 className="text-3xl font-extrabold mb-2">
          Welcome to FourPaws Admin
        </h1>
        <p className="mb-6 max-w-md">
          Please log in to manage pets, create profiles, and view pet forms.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center rounded bg-orange-600 px-6 py-3 text-white shadow-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          Login
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 flex flex-col items-center text-center max-w-4xl select-none">
      <div className="flex justify-center mb-8">
        <Paw className="h-16 w-16 text-orange-600 animate-bounce dark:text-orange-400" />
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide text-orange-900 dark:text-orange-200 mb-4">
        Manage Pets with FourPaws Admin
      </h1>

      <p className="text-lg text-orange-800 dark:text-orange-300 mb-8">
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
            className="flex flex-col items-center justify-center rounded-lg border-2 border-orange-600 bg-orange-100 p-6 text-orange-900 shadow-md transition hover:scale-105 hover:bg-orange-200 dark:border-orange-500 dark:bg-orange-900 dark:text-orange-300 dark:hover:bg-orange-800 sm:flex-1 sm:min-w-[180px]"
          >
            <div className="text-5xl mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2">{type}</h3>
            <p className="text-sm text-orange-800 dark:text-orange-400">
              Manage {type.toLowerCase()} with our intuitive interface.
            </p>
            <ArrowRight className="mt-3 h-5 w-5 text-orange-700 dark:text-orange-300" />
          </Link>
        ))}
      </div>
    </div>
  );
}