import { currentUser } from "@/lib/current-user";
import ConnectedToDb from "@/lib/dbConnection";
import { Project } from "@/lib/mongodb";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    await ConnectedToDb();
    try {
        const user = await currentUser();
        const {userId} = auth()
        console.log(user)
    
        const projects = await Project.find({ project_user: user._id });

        if (projects.length === 0) {
            return new NextResponse("No projects found for the user", { status: 404 });
        }

        return NextResponse.json(projects, { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal server error", { status: 500 });
    }
};