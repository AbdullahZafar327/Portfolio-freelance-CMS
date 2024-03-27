import { currentUser } from "@/lib/current-user";
import ConnectedToDb from "@/lib/dbConnection";
import { Project, User } from "@/lib/mongodb";
import { NextResponse } from "next/server";

interface projectIdProps {
  projectId: string;
}

export const PATCH = async (
  req: Request,
  { params }: { params: projectIdProps }
) => {
  await ConnectedToDb();

  try {
    const user = await currentUser();
    const { project_status } = await req.json();

    if (!user) {
      return new NextResponse("UnAuthorized User", { status: 404 });
    }

    const { projectId } = params;


    const admin = process.env.AdminEmail;
    const isAdmin = user.user_email === admin;

    if (!isAdmin) {
      return new NextResponse("You do not have permissions", { status: 403 });
    }

    if (!projectId) {
      return new NextResponse("ProjectId not found", { status: 404 });
    }

    const projectToUpdate = await Project.findOneAndUpdate(
      {
        _id: projectId,
      },
      {
        project_status: project_status,
      },
      {
        new: true,
      }
    );

    await projectToUpdate.save();

    return new NextResponse(projectToUpdate, { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("INTERNAL SERVER ERROR", { status: 500 });
  }
};

export const DELETE = async (
    req: Request,
    { params }: { params: projectIdProps }
) => {
  try {
    await ConnectedToDb();
    const user = await currentUser();
    const {projectId} = params

    if(!user){
        return new NextResponse("UnAuthorized User",{status:403})
    }

    const UserFromDatabase = await User.findOne({user_id:user.user_id})

    UserFromDatabase?.user_projects.pull(projectId)

    await UserFromDatabase.save()

    const DeletedProject = await Project.findOneAndDelete({
        _id : projectId
    })
    




    return new NextResponse(DeletedProject,{status:200})

    
  } catch (error) {
    console.log("Delete Request error",error)
    return new NextResponse("INTERNAL SERVER ERROR",{status:500})
  }
};
