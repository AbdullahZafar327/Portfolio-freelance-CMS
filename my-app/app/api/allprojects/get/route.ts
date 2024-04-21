
import ConnectedToDb from "@/lib/dbConnection"
import { Project } from "@/lib/mongodb";

import { NextResponse } from "next/server";

export const GET = async (req:Request) =>{
    await ConnectedToDb();
    try {

       const projects = await Project.find().populate("project_user")

       return NextResponse.json(projects,{status:200})
    } catch (error) {
        return new NextResponse('INTERNAL SERVER ERROR')
    }
}