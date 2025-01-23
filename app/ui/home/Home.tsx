"use client";

import { useUser } from "@/app/context/UserProvider";

export default function Home() {
  const { user, isLoading } = useUser();
  return (
    <div>
      {isLoading ? <div>Loading...</div> : <div>Home {user?.name}</div>}
    </div>
  )
}
