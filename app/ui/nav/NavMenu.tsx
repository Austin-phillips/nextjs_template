"use client";

import { useUser } from "@/app/context/UserProvider";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

function AuthButton() {
  const { data: session } = useSession();
  const { user } = useUser();
  if (session) {
    return (
      <>
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    );
  }
  return (
    <>
      <button onClick={() => signIn()}>Sign In</button>
    </>
  );
}

export default function NavMenu() {
  return (
    <div>
      <AuthButton />
    </div>
  );
}
