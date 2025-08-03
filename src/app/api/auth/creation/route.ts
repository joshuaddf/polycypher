import { prisma } from '@/lib/db';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        console.log("Starting user creation/sync process...");
        
        const { getUser } = await getKindeServerSession();
        const user = await getUser();

        console.log("Kinde user data:", { 
            id: user?.id, 
            email: user?.email, 
            hasUser: !!user 
        });

        if (user === null || !user || !user.id) {
            console.error("User not found in Kinde session");
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Check if user already exists in database
        let dbUser = await prisma.user.findUnique({
            where: {
                kindeId: user.id
            }
        });

        console.log("Database user lookup result:", { 
            found: !!dbUser, 
            userId: dbUser?.id 
        });

        if (!dbUser) {
            console.log("Creating new user in database...");
            
            // Create new user
            dbUser = await prisma.user.create({
                data: {
                    kindeId: user.id,
                    email: user.email ?? "",
                    firstName: user.given_name ?? "",
                    lastName: user.family_name ?? "",
                    profilePicture: user.picture ?? ""
                }
            });
            
            console.log("User created successfully:", { 
                dbUserId: dbUser.id, 
                kindeId: dbUser.kindeId 
            });
        } else {
            console.log("User already exists in database:", { 
                dbUserId: dbUser.id 
            });
            
            // Update existing user with latest data
            dbUser = await prisma.user.update({
                where: { id: dbUser.id },
                data: {
                    email: user.email ?? dbUser.email,
                    firstName: user.given_name ?? dbUser.firstName,
                    lastName: user.family_name ?? dbUser.lastName,
                    profilePicture: user.picture ?? dbUser.profilePicture
                }
            });
            
            console.log("User updated successfully");
        }

        console.log("User sync completed successfully");
        return NextResponse.redirect("http://localhost:3000/dashboard/clinical-portal");
        
    } catch (error) {
        console.error("Error in user creation/sync:", error);
        return NextResponse.json({ 
            error: "Failed to sync user", 
            details: error instanceof Error ? error.message : "Unknown error" 
        }, { status: 500 });
    }
}