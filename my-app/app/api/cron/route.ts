import ConnectedToDb from "@/lib/dbConnection";
import { IProject, Project, status } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  await ConnectedToDb();
  const nineDaysAgo = new Date();
  nineDaysAgo.setDate(nineDaysAgo.getDate() - 4);

  await Project.deleteMany({
    project_status: status.completed,
    completedAt: { $lte: nineDaysAgo },
  });

  return new NextResponse("Deleted Completed Projects successfully after 9 days",{status:200})
};
