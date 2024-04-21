import { currentUser } from "@/lib/current-user";
import ConnectedToDb from "@/lib/dbConnection";
import { User } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    await ConnectedToDb();
    try {
        const profile = await currentUser();
        if (!profile) {
            throw new Error("User profile not found");
        }

        const user = await User.findOne({ _id: profile._id });
        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        return new NextResponse(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse("INTERNAL SERVER ERROR", { status: 500 });
    }
};
