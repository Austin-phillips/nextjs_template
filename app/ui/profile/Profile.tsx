'use client';

import { useUser } from '@/app/context/UserProvider';
import axios from 'axios';

export default function Profile() {
  const { user, refreshUser } = useUser();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    try {
      await axios.post('/api/user', data);
      console.log("SUCCESS");
      refreshUser();
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 text-white w-full p-16">
      <div className="space-y-12">
        <div className="border-b border-gray-700 pb-12">
          <h2 className="text-base/7 font-semibold text-white">Profile</h2>
        </div>

        <div className="border-b border-gray-700 pb-12">
          <h2 className="text-base/7 font-semibold text-white">Personal Information</h2>
          <p className="mt-1 text-sm/6 text-gray-400">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="firstName" className="block text-sm/6 font-medium text-white">
                First name
              </label>
              <div className="mt-2">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  defaultValue={user?.first_name || ''}
                  className="block w-full rounded-md bg-gray-700 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="lastName" className="block text-sm/6 font-medium text-white">
                Last name
              </label>
              <div className="mt-2">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  defaultValue={user?.last_name || ''}
                  className="block w-full rounded-md bg-gray-700 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-full">
              <label htmlFor="email" className="block text-sm/6 font-medium text-white">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  defaultValue={user?.email || ''}
                  disabled
                  className="block w-full rounded-md bg-gray-700 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="sm:col-span-full">
              <label htmlFor="phone" className="block text-sm/6 font-medium text-white">
                Phone
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="phone"
                  autoComplete="phone"
                  defaultValue={user?.phone || ''}
                  className="block w-full rounded-md bg-gray-700 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-700 pb-12">
          <h2 className="text-base/7 font-semibold text-white">Notifications</h2>
          <p className="mt-1 text-sm/6 text-gray-400">
            We'll always let you know about new deals, but you pick how you want to be notified.
          </p>

          <div className="mt-10 space-y-10">
            <fieldset>
              <div className="mt-6 space-y-6">
                <div className="flex gap-3">
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        defaultChecked
                        id="text"
                        type="checkbox"
                        aria-describedby="text-description"
                        className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-600 bg-gray-700 checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-600 disabled:bg-gray-600 disabled:checked:bg-gray-600 forced-colors:appearance-auto"
                      />
                      <svg
                        fill="none"
                        viewBox="0 0 14 14"
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-checked:opacity-100"
                        />
                        <path
                          d="M3 7H11"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-indeterminate:opacity-100"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-sm/6">
                    <label htmlFor="comments" className="font-medium text-white">
                      Text
                    </label>
                    <p id="comments-description" className="text-gray-500">
                      Get texts about future deals.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        id="email"
                        type="checkbox"
                        aria-describedby="email-description"
                        className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-600 bg-gray-700 checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-600 disabled:bg-gray-600 disabled:checked:bg-gray-600 forced-colors:appearance-auto"
                      />
                      <svg
                        fill="none"
                        viewBox="0 0 14 14"
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-checked:opacity-100"
                        />
                        <path
                          d="M3 7H11"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="opacity-0 group-has-indeterminate:opacity-100"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-sm/6">
                    <label htmlFor="candidates" className="font-medium text-white">
                      Email
                    </label>
                    <p id="candidates-description" className="text-gray-500">
                      Get emails about future deals.
                    </p>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm/6 font-semibold text-white">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  )
}
