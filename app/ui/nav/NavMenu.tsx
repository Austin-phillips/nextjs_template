"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

function AuthButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <p>Signed in as {session.user?.name}</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    );
  }
  return (
    <>
      <p>Not signed in</p>
      <button onClick={() => signIn()}>Sign In</button>
    </>
  );
}

export default function NavMenu() {
  return (
    <div>
      <Link href="/">Home</Link>
      <AuthButton />
    </div>
  );
}
