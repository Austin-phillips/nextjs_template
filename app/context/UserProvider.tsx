"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { getCurrentUser } from "../lib/user/data";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";

interface UserContextType {
  user: Partial<User> | null;
  setUser: (user: Partial<User> | null) => void;
  isLoading: boolean;
  refreshUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Partial<User> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { status } = useSession();

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const response = await getCurrentUser();
      setUser(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchUser();
    }
  }, [status]);

  const refreshUser = () => {
    fetchUser();
  };

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
