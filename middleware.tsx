import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  return withAuth(req, {
    // Add custom logic after authentication
    afterAuth: async (req: NextRequest, token: any) => {
      // If user is authenticated, sync them to database
      if (token?.user) {
        try {
          // Call the user sync API
          const syncResponse = await fetch(`${req.nextUrl.origin}/api/auth/sync-user`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: token.user.id }),
          });
          
          if (!syncResponse.ok) {
            console.error('Failed to sync user to database');
          }
        } catch (error) {
          console.error('Error syncing user:', error);
        }
      }
      
      return NextResponse.next();
    }
  });
}

export const config = {
  matcher: [
    // Run on everything but Next internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ]
};