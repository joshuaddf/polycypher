"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect, useState } from "react";

interface User {
  id: string;
  kindeId: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export const useAuth = () => {
  const { user, isAuthenticated, isLoading } = useKindeBrowserClient();
  const [dbUser, setDbUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (isAuthenticated && user) {
        try {
          const response = await fetch('/api/user');
          if (response.ok) {
            const data = await response.json();
            setDbUser(data.user);
          }
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
      setLoading(false);
    };

    if (!isLoading) {
      fetchUser();
    }
  }, [isAuthenticated, user, isLoading]);

  return {
    user: dbUser,
    isAuthenticated,
    isLoading: loading || isLoading,
  };
};
