# User Sync Debugging Guide

## Problem
Users are not syncing to the database despite no errors being shown.

## Solutions Implemented

### 1. Enhanced User Creation Route
- Added comprehensive error handling and logging
- Added user update functionality for existing users
- Added detailed console logging for debugging

### 2. New User Sync API (`/api/auth/sync-user`)
- Dedicated endpoint for user synchronization
- Supports both GET and POST methods
- Comprehensive error handling and logging
- Can be called from middleware or client-side

### 3. Middleware Integration
- Updated middleware to automatically sync users after authentication
- Added `afterAuth` callback to handle user sync

### 4. Client-Side User Sync Hook
- Created `useUserSync` hook for automatic client-side sync
- Provides loading states and error handling
- Integrated into dashboard layout

### 5. User Sync Provider
- Wraps dashboard components to ensure user sync
- Shows loading states during sync
- Handles sync errors gracefully

## Debugging Steps

### 1. Check Database Connection
Visit: `http://localhost:3000/api/test-db`
This will show:
- Database connection status
- Total user count
- List of existing users

### 2. Check Environment Variables
Ensure these are set in your `.env.local`:
```
DATABASE_URL="your_postgresql_connection_string"
KINDE_CLIENT_ID="your_kinde_client_id"
KINDE_CLIENT_SECRET="your_kinde_client_secret"
KINDE_ISSUER_URL="your_kinde_issuer_url"
KINDE_SITE_URL="http://localhost:3000"
KINDE_LOGOUT_REDIRECT_URL="http://localhost:3000"
KINDE_LOGIN_REDIRECT_URL="http://localhost:3000/dashboard/clinical-portal"
```

### 3. Test User Sync Manually
Visit: `http://localhost:3000/api/auth/sync-user`
This will attempt to sync the current user and show the result.

### 4. Check Console Logs
Open browser developer tools and check the console for:
- "Starting user sync process..."
- "Kinde user data: ..."
- "Database user lookup result: ..."
- "User created successfully" or "User updated successfully"

### 5. Verify Database Schema
Run: `npx prisma db push` to ensure schema is up to date
Run: `npx prisma generate` to regenerate Prisma client

### 6. Check Authentication Flow
1. Clear browser cookies and local storage
2. Log out and log back in
3. Check if the middleware is calling the sync endpoint

## Common Issues and Solutions

### Issue: "User not found in Kinde session"
**Solution**: Ensure Kinde authentication is properly configured and the user is logged in.

### Issue: Database connection errors
**Solution**: 
1. Check your `DATABASE_URL` environment variable
2. Ensure your database is running and accessible
3. Run `npx prisma db push` to sync schema

### Issue: Users not being created
**Solution**:
1. Check console logs for detailed error messages
2. Verify the user has a valid Kinde ID
3. Ensure the database schema matches the expected structure

### Issue: Middleware not calling sync
**Solution**:
1. Check if the middleware is properly configured
2. Verify the sync endpoint is accessible
3. Check network tab for failed requests

## Testing the Fix

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Test database connection**:
   Visit `http://localhost:3000/api/test-db`

3. **Test user sync**:
   - Log in to your application
   - Visit `http://localhost:3000/api/auth/sync-user`
   - Check the response

4. **Monitor console logs**:
   - Open browser developer tools
   - Navigate to the dashboard
   - Check for sync-related log messages

5. **Verify user creation**:
   - Visit `http://localhost:3000/api/test-db` again
   - Check if the user count increased

## Additional Debugging Tools

### Manual User Sync
You can manually trigger user sync from the browser console:
```javascript
fetch('/api/auth/sync-user', { method: 'POST' })
  .then(res => res.json())
  .then(data => console.log(data));
```

### Check User Existence
```javascript
fetch('/api/auth/check-user?kindeId=YOUR_KINDE_ID')
  .then(res => res.json())
  .then(data => console.log(data));
```

## Expected Behavior

After implementing these fixes:
1. Users should automatically sync when they log in
2. Console logs should show the sync process
3. Database should contain user records
4. No errors should appear in the console
5. The dashboard should load without sync-related errors

If you're still experiencing issues, check the console logs for specific error messages and ensure all environment variables are properly configured. 