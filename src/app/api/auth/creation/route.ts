import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    const { getUser } = await getKindeServerSession();
    const user = await getUser();

    if (user === null || !user || !user.id) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
}

    let dbUser = await prisma.user.findUnique({
        where: {
            kindeId: user.id
        }
    });

    if (!dbUser) {
        dbUser = await prisma.user.create({
            data: {
                kindeId: user.id,
                email: user.email ?? "",
                firstName: user.given_name ?? "",
                lastName: user.family_name ?? "",
                profilePicture: user.picture ?? ""
            }
        })
    }

    return NextResponse.redirect("http://localhost:3000/dashboard/clinical-portal");
}