import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { getUser } = await getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let dbUser = await prisma.user.findUnique({
      where: { kindeId: user.id }
    });

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          kindeId: user.id,
          firstName: user.given_name ?? "",
          lastName: user.family_name ?? "",
          email: user.email ?? "",
        }
      });
    }

    const body = await request.json();
    const {
      pcos,
      follicleR,
      follicleL,
      skinDarkening,
      hairGrowth,
      weightGain,
      cycle,
      fastFood,
      pimples,
      amh,
      weight,
      score
    } = body;

    console.log("POST /api/assessment - Creating assessment with data:", {
      userId: dbUser.id,
      pcos,
      follicleR,
      follicleL,
      skinDarkening,
      hairGrowth,
      weightGain,
      cycle,
      fastFood,
      pimples,
      amh,
      weight,
      score
    });

    const assessment = await prisma.pcosAssessment.create({
      data: {
        userId: dbUser.id,
        pcos,
        follicleR: follicleR ? parseFloat(follicleR) : null,
        follicleL: follicleL ? parseFloat(follicleL) : null,
        skinDarkening,
        hairGrowth,
        weightGain,
        cycle,
        fastFood,
        pimples,
        amh: amh ? parseFloat(amh) : null,
        weight: weight ? parseFloat(weight) : null,
        score: score ? parseFloat(score) : null,
      }
    });

    console.log("POST /api/assessment - Assessment created successfully:", assessment.id);

    return NextResponse.json({ 
      success: true, 
      assessment,
      message: "Assessment saved successfully" 
    });

  } catch (error) {
    console.error("Error saving assessment:", error);
    return NextResponse.json(
      { error: "Failed to save assessment" }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    console.log("GET /api/assessment - Starting request");
    
    const { getUser } = await getKindeServerSession();
    const user = await getUser();

    console.log("GET /api/assessment - User from session:", user ? { id: user.id, email: user.email } : "No user");

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { kindeId: user.id }
    });

    console.log("GET /api/assessment - Database user found:", dbUser ? { id: dbUser.id, email: dbUser.email } : "No database user");

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("GET /api/assessment - Fetching assessments for user:", dbUser.id);
    const assessments = await prisma.pcosAssessment.findMany({
      where: { userId: dbUser.id },
      orderBy: { createdAt: 'desc' }
    });

    console.log("GET /api/assessment - Found assessments:", assessments.length, "assessments");

    return NextResponse.json({ assessments });

  } catch (error) {
    console.error("Error fetching assessments:", error);
    return NextResponse.json(
      { error: "Failed to fetch assessments" }, 
      { status: 500 }
    );
  }
}
