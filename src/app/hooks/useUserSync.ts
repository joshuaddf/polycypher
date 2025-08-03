import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect, useState } from "react";

export const useUserSync = () => {
  const { user, isAuthenticated, isLoading } = useKindeAuth();
  const [isSynced, setIsSynced] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);

  useEffect(() => {
    const syncUser = async () => {
      if (isAuthenticated && user && !isSynced) {
        try {
          console.log("Syncing user to database...");
          const response = await fetch("/api/auth/sync-user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const data = await response.json();
            console.log("User synced successfully:", data);
            setIsSynced(true);
            setSyncError(null);
          } else {
            const errorData = await response.json();
            console.error("Failed to sync user:", errorData);
            setSyncError(errorData.error || "Failed to sync user");
          }
        } catch (error) {
          console.error("Error syncing user:", error);
          setSyncError("Network error while syncing user");
        }
      }
    };

    if (!isLoading) {
      syncUser();
    }
  }, [isAuthenticated, user, isSynced, isLoading]);

  return {
    isSynced,
    syncError,
    isLoading: isLoading || (!isSynced && isAuthenticated),
  };
}; 