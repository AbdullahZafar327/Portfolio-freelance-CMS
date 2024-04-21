import ConnectedToDb from "@/lib/dbConnection";
import { IProject, Project, status } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  await ConnectedToDb();
  const fiveMinutesAgo = new Date();
  fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);

  await Project.deleteMany({
    project_status: status.completed,
    completedAt: { $lte: fiveMinutesAgo },
  });

  return new NextResponse("Deleted Completed Projects successfully after 9 days",{status:200})
};
