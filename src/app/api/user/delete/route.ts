import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidateDashboardPaths } from "@/lib/utils/revalidation";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    const { getUser } = await getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    if (!body.confirmed) {
      return NextResponse.json({ error: "Deletion not confirmed" }, { status: 400 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { kindeId: user.id }
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log(`User ${dbUser.email} (${dbUser.id}) is deleting their account`);

    try {
      await prisma.pcosAssessment.deleteMany({
        where: { userId: dbUser.id }
      });
      console.log(`Deleted ${dbUser.id} assessments for user ${dbUser.id}`);
    } catch (assessmentError) {
      console.error("Error deleting assessments:", assessmentError);
    }

    await prisma.user.delete({
      where: { id: dbUser.id }
    });

    console.log(`User ${dbUser.email} (${dbUser.id}) deleted successfully`);

    revalidateDashboardPaths();

    return NextResponse.json({ success: true, message: "Account deleted successfully" });

  } catch (error) {
    console.error("Error deleting user:", error);
    
    if (error instanceof Error) {
      if (error.message.includes('foreign key constraint')) {
        return NextResponse.json(
          { error: "Cannot delete account due to existing data. Please contact support." }, 
          { status: 400 }
        );
      }
    }
    
    return NextResponse.json(
      { error: "Failed to delete account. Please try again or contact support." }, 
      { status: 500 }
    );
  }
}
