import { useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * Custom hook for handling dashboard path revalidation
 * Provides functions to refresh dashboard data after form submissions
 */
export const useRevalidation = () => {
  const router = useRouter();

  /**
   * Refreshes all dashboard paths to show updated data
   * Call this after successful form submissions or data mutations
   */
  const refreshDashboard = useCallback(() => {
    router.refresh();
  }, [router]);

  /**
   * Refreshes a specific path
   * @param path - The specific path to refresh
   */
  const refreshPath = useCallback((path: string) => {
    router.refresh();
  }, [router]);

  return {
    refreshDashboard,
    refreshPath,
  };
};
