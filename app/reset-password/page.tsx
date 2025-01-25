"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === 1) {
      try {
        await axios.post('/api/user/reset-password', { email });
        setStep(2);
        toast.success("Code sent to email.");
      } catch (error) {
        toast.error("Invalid email. Please try again.");
      }
    } else if (step === 2) {
      try {
        await axios.post('/api/user/reset-password/verify', { email, code });
        setStep(3);
      } catch (error) {
        toast.error("Invalid code. Please try again.");
      }
    } else if (step === 3) {
      try {
        await axios.post('/api/user/reset-password/set-password', { email, password });
        router.push('/login');
      } catch (error) {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const buttonText = () => {
    if (step === 3) {
      return "Reset Password";
    } else if (step === 2) {
      return "Verify Code";
    } else {
      return "Send Email";
    }
  };

  const buttonDisabled = () => {
    if (step === 3) {
      return password !== confirmPassword || password.length < 6;
    }
    return false;
  };

  return (
      <form onSubmit={handleSubmit} className="space-y-2">
        {step === 1 && (
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md bg-gray-700 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <label htmlFor="code" className="block text-sm/6 font-medium text-white">
              Code
            </label>
            <div className="mt-2">
              <input
                id="code"
                name="code"
                type="text"
                required
                autoComplete="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="block w-full rounded-md bg-gray-700 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
        )}
        {step === 3 && (
          <>
            <div>
              <label htmlFor="password" className="block text-sm/6 font-medium text-white">
                New Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md bg-gray-700 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm/6 font-medium text-white">
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full rounded-md bg-gray-700 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          </>
        )}
        <div className="mt-1 text-center">
          <Link href="/login" className="text-sm/6 text-indigo-600">
            Back to login
          </Link>
        </div>
        <div>
          <button
            type="submit"
            disabled={buttonDisabled()}
            className={`flex w-full mt-4 justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 ${buttonDisabled() ? 'bg-gray-500' : 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600'}`}
          >
            {buttonText()}
          </button>
        </div>
      </form>
  );
}