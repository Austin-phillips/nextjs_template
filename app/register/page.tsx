"use client";

import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
  const [errors, setErrors] = useState<any>("");
  const [phone, setPhone] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    const formattedPhone = value
      .replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
      .slice(0, 12); // Format and limit to 10 digits
    setPhone(formattedPhone);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors("");
    const formData = new FormData(e.target as HTMLFormElement);

    try {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      await axios.post("/api/user/register", {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        phone: phone,
        password: formData.get("password"),
      });
      signIn("credentials", { email, password, redirect: true, callbackUrl: "/" });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        const errors = error.response.data.errors;
        toast.error('Please fix the errors');
        setErrors(errors);
      } else {
        toast.error('Something went wrong');
      }
    }
  };

  return (
      <form onSubmit={handleSubmit} className="space-y-2 h-full">
        <div>
          <label htmlFor="firstName" className="block text-sm/6 font-medium text-white">
            First name
          </label>
          <div className="mt-2">
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              autoComplete="given-name"
              className="block w-full rounded-md bg-gray-700 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
          {errors.firstName && <p className="text-red-500 text-sm/6">{errors.firstName}</p>}
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm/6 font-medium text-white">
            Last name
          </label>
          <div className="mt-2">
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              autoComplete="family-name"
              className="block w-full rounded-md bg-gray-700 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
          {errors.lastName && <p className="text-red-500 text-sm/6">{errors.lastName}</p>}
        </div>
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
              autoComplete="username"
              className="block w-full rounded-md bg-gray-700 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm/6">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm/6 font-medium text-white">
            Phone
          </label>
          <div className="mt-2">
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              inputMode="numeric"
              value={phone}
              onChange={handlePhoneChange}
              className="block w-full rounded-md bg-gray-700 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
          {errors.phone && <p className="text-red-500 text-sm/6">{errors.phone}</p>}
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
              autoComplete="new-password"
              className="block w-full rounded-md bg-gray-700 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
          <div className="mt-1 text-center">
            <Link href="/login" className="text-sm/6 text-indigo-600">
              Already have an account? Login
            </Link>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create account
          </button>
        </div>
      </form>
  );
}