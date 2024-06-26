import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();

const handleAuth = () => {
    const {userId} = auth()

    if(!userId){
        throw new Error("An authorized error")
    }

    return { userId: userId}
}
 

export const ourFileRouter = {


    Uploader: f({
        image:{maxFileCount:5,maxFileSize:'64MB'},
        pdf:{maxFileCount:2},
    })
    .middleware(()=>handleAuth())
    .onUploadComplete(async () => {}),

    ProfileUploader:f({
        image:{maxFileCount:1,maxFileSize:"4MB"}
    }).middleware(()=>handleAuth()).onUploadComplete(async()=>{}),

    
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;