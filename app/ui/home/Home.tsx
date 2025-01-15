"use client";

import { useUser } from "@/app/context/UserProvider";

export default function Home() {
  const { user, isLoading } = useUser();
  return (
    <div className="flex justify-center items-center h-screen">
      {isLoading ? <div>Loading...</div> : <div>Home {user?.name}</div>}
    </div>
  )
}
