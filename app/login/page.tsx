"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [errors, setErrors] = useState<any>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors("");
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    signIn("credentials", { email, password, redirect: false })
      .then((result) => {
        if (result?.error) {
          setErrors("Incorrect email or password. Please try again.");
        } else {
          window.location.href = "/";
        }
      })
      .catch((error) => {
        setErrors("An unexpected error occurred.");
      });
  };

  return (
      <form onSubmit={handleSubmit} className="space-y-2 h-full">
        {errors && <p className="text-red-500 text-sm/6">{errors}</p>}
        <div>
          <label htmlFor="email" className="block text-sm/6 font-medium text-white">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="block w-full rounded-md bg-gray-700 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="block text-sm/6 font-medium text-white">
            Password
          </label>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="block w-full rounded-md bg-gray-700 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
          <div className="mt-1 text-center">
            <Link href="/reset-password" className="text-sm/6 text-indigo-600">
              Forgot password?
            </Link>
          </div>
          <div className="mt-1 text-center">
            <Link href="/register" className="text-sm/6 text-indigo-600">
              Create an account
            </Link>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>
  );
}