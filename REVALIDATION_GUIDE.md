# Dashboard Revalidation System

This document explains how the dashboard revalidation system works to ensure fresh data is displayed after form submissions.

## Overview

The system automatically revalidates all dashboard paths whenever:
- A PCOS assessment form is submitted
- User data is created, updated, or deleted
- Assessment data is fetched

## How It Works

### 1. Server-Side Revalidation

All API routes that modify data automatically revalidate dashboard paths using the `revalidateDashboardPaths()` function:

```typescript
// Located in src/lib/utils/revalidation.ts
export const revalidateDashboardPaths = () => {
  revalidatePath('/dashboard/clinical-portal');
  revalidatePath('/dashboard/pcos-info');
  revalidatePath('/dashboard/profile');
  revalidatePath('/dashboard');
  revalidatePath('/dashboard', 'layout');
};
```

**API Routes with Auto-Revalidation:**
- `POST /api/assessment` - After creating new assessments
- `GET /api/assessment` - After fetching assessment data
- `GET /api/auth/creation` - After user creation
- `GET /api/user` - After user data operations
- `DELETE /api/user/delete` - After user deletion

### 2. Client-Side Revalidation

Forms use the `useRevalidation` hook to refresh the page after successful submissions:

```typescript
// Located in src/lib/hooks/useRevalidation.ts
export const useRevalidation = () => {
  const router = useRouter();
  
  const refreshDashboard = useCallback(() => {
    router.refresh();
  }, [router]);
  
  return { refreshDashboard };
};
```

**Components Using Client-Side Revalidation:**
- `PcosAssessmentForm` - Refreshes after form submission and auto-save

### 3. Dashboard Paths Covered

The following dashboard paths are automatically revalidated:

- `/dashboard/clinical-portal` - Main assessment dashboard
- `/dashboard/pcos-info` - PCOS information page
- `/dashboard/profile` - User profile page
- `/dashboard` - Root dashboard layout

## Benefits

1. **Automatic Updates**: No manual refresh needed after form submissions
2. **Data Consistency**: All dashboard pages show the same up-to-date information
3. **Better UX**: Users see their changes immediately
4. **Centralized Logic**: Easy to maintain and modify revalidation behavior

## Usage Examples

### Adding Revalidation to New API Routes

```typescript
import { revalidateDashboardPaths } from "@/lib/utils/revalidation";

export async function POST(request: NextRequest) {
  // ... your logic here
  
  // Revalidate all dashboard paths
  revalidateDashboardPaths();
  
  return NextResponse.json({ success: true });
}
```

### Using Client-Side Revalidation in Components

```typescript
import { useRevalidation } from "@/lib/hooks/useRevalidation";

const MyForm = () => {
  const { refreshDashboard } = useRevalidation();
  
  const handleSubmit = async () => {
    // ... submit logic
    
    // Refresh dashboard after successful submission
    refreshDashboard();
  };
};
```

## Technical Details

- **Server-Side**: Uses Next.js `revalidatePath()` function
- **Client-Side**: Uses Next.js `router.refresh()` for seamless updates
- **Performance**: Only revalidates necessary paths, not entire application
- **Caching**: Works with Next.js built-in caching and ISR features

## Troubleshooting

If revalidation isn't working:

1. Check that `revalidateDashboardPaths()` is called after data mutations
2. Ensure the API route is properly imported and used
3. Verify that the component is using the `useRevalidation` hook
4. Check browser console for any errors

## Future Enhancements

- Add selective path revalidation for better performance
- Implement optimistic updates for better UX
- Add revalidation for other data types (charts, analytics, etc.)
- Consider using SWR or React Query for more granular control
