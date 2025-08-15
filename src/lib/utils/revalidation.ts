import { revalidatePath } from "next/cache";

/**
 * Revalidates all dashboard paths to ensure fresh data
 * This function should be called after any data mutations
 * that affect dashboard content
 */
export const revalidateDashboardPaths = () => {
  // Revalidate all dashboard paths
  revalidatePath('/dashboard/clinical-portal');
  revalidatePath('/dashboard/pcos-info');
  revalidatePath('/dashboard/profile');
  revalidatePath('/dashboard');
  
  // Also revalidate the root dashboard layout
  revalidatePath('/dashboard', 'layout');
};

/**
 * Revalidates specific dashboard paths
 * @param paths - Array of specific paths to revalidate
 */
export const revalidateSpecificPaths = (paths: string[]) => {
  paths.forEach(path => {
    revalidatePath(path);
  });
};
