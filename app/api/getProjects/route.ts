import { currentUser } from "@/lib/current-user"
import ConnectedToDb from "@/lib/dbConnection"
import { Project } from "@/lib/mongodb"
import { NextResponse } from "next/server"
import { Request } from "express" // Assuming you're using Express for the request object

export const GET = async (req: Request) => {
    await ConnectedToDb()
    try {
        const user = await currentUser()

        if (!user) {
            return new NextResponse("Unauthorized user", { status: 404 })
        }

        const projects = await Project.find({ project_user: user._id })

        if (projects.length === 0) {
            return new NextResponse("No projects found for the user", { status: 404 })
        }

        return NextResponse.json(projects, { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal server error", { status: 500 })
    }
}
