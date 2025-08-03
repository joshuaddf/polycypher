import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        console.log("Starting user sync process...");
        
        const { getUser } = await getKindeServerSession();
        const user = await getUser();

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
            
            console.log("User created successfully");
        } else {
            console.log("User already exists in database");
            
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
        return NextResponse.json({ 
            success: true, 
            user: {
                id: dbUser.id,
                kindeId: dbUser.kindeId,
                email: dbUser.email
            }
        });
        
    } catch (error) {
        console.error("Error in user sync:", error);
        return NextResponse.json({ 
            error: "Failed to sync user", 
            details: error instanceof Error ? error.message : "Unknown error" 
        }, { status: 500 });
    }
}

export async function GET() {
    try {
        console.log("Starting user sync process (GET)...");
        
        const { getUser } = await getKindeServerSession();
        const user = await getUser();

        if (user === null || !user || !user.id) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Check if user already exists in database
        let dbUser = await prisma.user.findUnique({
            where: {
                kindeId: user.id
            }
        });

        if (!dbUser) {
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
        } else {
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
        }

        return NextResponse.json({ 
            success: true, 
            user: {
                id: dbUser.id,
                kindeId: dbUser.kindeId,
                email: dbUser.email
            }
        });
        
    } catch (error) {
        console.error("Error in user sync:", error);
        return NextResponse.json({ 
            error: "Failed to sync user", 
            details: error instanceof Error ? error.message : "Unknown error" 
        }, { status: 500 });
    }
} 