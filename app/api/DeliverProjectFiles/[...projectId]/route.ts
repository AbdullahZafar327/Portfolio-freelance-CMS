import { currentUser } from "@/lib/current-user";
import ConnectedToDb from "@/lib/dbConnection";
import { Order, Project, User, status } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

interface projectIdProps {
  projectId: string;
}

export const PATCH = async (
  req: NextRequest,
  { params }: { params: projectIdProps }
) => {
  await ConnectedToDb();

  try {
    const user = await currentUser();
    const { urls } = await req.json();
    const { searchParams} = new URL(req.url)
    if (!user) {
      return new NextResponse("UnAuthorized User", { status: 404 });
    }

    const { projectId } = params;
    const  orderId = searchParams.get("orderId")

    console.log(orderId)
    console.log(projectId)
    console.log(urls)


    const admin = process.env.AdminEmail;
    const isAdmin = user.user_email === admin;

    if (!isAdmin) {
      return new NextResponse("You do not have permissions", { status: 403 });
    }

    if (!projectId) {
      return new NextResponse("ProjectId not found", { status: 404 });
    }

    if (!orderId) {
      return new NextResponse("orderId not found", { status: 404 });
    }
    if (!urls) {
      return new NextResponse("Files not found", { status: 404 });
    }

    const projectToUpdate = await Project.findOneAndUpdate(
      {
        _id: projectId,
      },
      {
        project_status: status.completed,
        FinishedFiles:urls
      },
    );

    await projectToUpdate.save();

    // const order = await Order.findByIdAndDelete({
    //   _id:orderId
    // })

    // await order.save()

    return new NextResponse("Updates Successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("INTERNAL SERVER ERROR", { status: 500 });
  }
};

