import ConnectedToDb from "@/lib/dbConnection";
import { IProject, Project, status } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  await ConnectedToDb();
  const Projects = await Project.find({ project_status: status.completed });

  await Promise.all(
    Projects.map(async (project: IProject) => {
      await Project.findByIdAndDelete(project._id);
    })
  );

  return new NextResponse("Deleted Successfully", { status: 200 });
};
