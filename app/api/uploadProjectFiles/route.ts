import { put,del } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { createWriteStream } from "fs";
import JSZip from 'jszip'

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    const zip = new JSZip();
    for (const file of files) {
      const fileContent = await file.arrayBuffer(); // Read file content as ArrayBuffer
      zip.file(file.name, fileContent); // Add file to ZIP archive
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });

    const blob = await put("projectFiles.zip", zipBlob, {
      access: "public",
    });

    return NextResponse.json({ downloadUrl: blob.downloadUrl });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req:Request){
    try {
        const json = await req.json() 
        console.log({json})
        const response = await del(json.url)
        return new NextResponse("Deleted successfully",{status:200})
    } catch (error) {
        console.log(error)
        return new NextResponse("internal server error")
    }
    
}