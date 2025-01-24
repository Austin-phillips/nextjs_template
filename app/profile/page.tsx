"use client";

import Profile from "@/app/ui/profile/Profile";
import protectedRoute from "../utils/protectedRoute";

const Page = () => {
  return <Profile />;
}

export default protectedRoute(Page);