"use client";

import { useUser } from "@/app/context/UserProvider";

export default function Home() {
  const { user } = useUser();
  return (
    <div>
       <div>Home {user?.name}</div>
    </div>
  )
}
