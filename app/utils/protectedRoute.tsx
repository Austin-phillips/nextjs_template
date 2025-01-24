"use client";

import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import Loading from "@/app/ui/loading/loading";

const protectedRoute = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const { status } = useSession();

    useEffect(() => {
      if (status === "unauthenticated") {
        signIn();
      }
    }, [status]);

    if (status === "loading") {
      return <Loading />; // Render nothing while loading
    }

    return <WrappedComponent {...props} />;
  };
};

export default protectedRoute;