"use client";

import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";

const protectedRoute = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const { status } = useSession();

    useEffect(() => {
      if (status === "loading") {
        return; // Do nothing while loading
      }; // Do nothing while loading
      if (status === "unauthenticated") {
        signIn();
      }
    }, [status]);

    return <WrappedComponent {...props} />;
  };
};

export default protectedRoute;