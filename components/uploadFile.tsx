"use client";
import { UploadDropzone } from "@/lib/uploadthing";
import { Loader, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import motion from 'framer-motion'

interface UploadProps {
  endPoint: "Uploader";
  onChange: (urls: string[]) => void; // Update the onChange function to accept an array of URLs
  value?: string[];
}

const UploadFile = ({ endPoint, onChange, value }: UploadProps) => {
  const [loading, setLoading] = useState(false);
  const [error , setError] = useState(false)
  const handleUploadComplete = (urls: string[]) => {
    const updatedUrls = [...(value ?? []), ...urls];
    onChange(updatedUrls);
  };

  const deleteImage  = (index:number) => {
    const updateValue = [...(value ?? [])];
    const updatedValue = updateValue?.filter((url,i) => i !== index)
    onChange(updatedValue)
  }

  return (
    <>
    {error && (
          <div className="flex text-center justify-center">
            <p className="font-bold text-rose-500">Sorry,Can't upload more than 10 files</p>
          </div>
      )}
      <div className="relative flex justify-center">
        <div
          className="p-8 border-2 border-black cursor-pointer rounded-3xl text-black h-[350px] w-[500px] flex justify-center items-center"
          style={{
            background:
              "linear-gradient(to right bottom,rgba(255,255,255,0.5),rgba(255,255,255,0.2))",
          }}
        >
          {value && value?.length < 5 ? (
            <UploadDropzone
              endpoint={endPoint}
              onClientUploadComplete={(res) => {
                handleUploadComplete(res?.map((file) => file.url) ?? []);
                setLoading(false);
              }}
              onUploadError={(error: Error) => {
                setError(true)
                setTimeout(()=>{
                  setError(false)
                },3000)
              }}
              
              className="text-black w-[400px] h-[300px] border-2 border-dashed border-black hover:bg-blue-200/20"
              onUploadBegin={() => setLoading(true)}
            />
          ):(
            <div className="flex items-center justify-center animate-bounce">
            <Image height={200} width={200} src="/ghost.png" alt="limitCrossed" />
            </div>
          )} 
        </div>
        {loading && (
            <div className="absolute bottom-2 left-1/2">
              <Loader className="animate-spin h-30 w-30 text-rose-600" />
            </div>
          )}
          
      </div>
      <div>
      {value&& value.length >= 5 && (
            <div className="flex justify-center p-4">
               <p className="font-bold text-rose-500 text-center text-xl ">Reached Maximum Limit of 5</p>
            </div>
          )}
        {value && value.length>0 && (
          <div className="flex items-center gap-4 bg-orange-300 h-[100px] w-full p-8"
          style={{
            background:
              "linear-gradient(to right bottom,rgba(255,255,255,0.5),rgba(255,255,255,0.2))",
          }}
          >
            {value &&
              value.map((url, index) => {
                const fileType = url.split(".").pop();
                if (fileType && fileType === "png") {
                  return (
                    <div
                      key={index}
                      className="relative rounded-lg h-[80px] w-[80px] flex  flex-col items-center justify-center cursor-pointer bg-orange-400"
                      
                    >
                      <Image
                        src="/png.png"
                        alt="UploadFiles"
                        width={40}
                        height={40}
                        className="relative"
                      />
                      <button
                        onClick={() => deleteImage(index)}
                        className="absolute -top-2 -right-2 rounded-full bg-rose-500 hover:bg-white" 
                      >
                        <X />
                      </button>
                      <span className="text-black font-semibold  h-4 w-4 hover:text-white text-center">
                        ({index + 1})
                      </span>
                    </div>
                  );
                }
                if (fileType && fileType === "pdf") {
                  return (
                    <div
                      key={index}
                      className="relative rounded-lg h-[80px] w-[80px] flex  flex-col items-center justify-center cursor-pointer bg-orange-400"
                      
                    >
                      <Image
                        src="/pdf.png"
                        alt="UploadFiles"
                        width={40}
                        height={40}
                        className="relative"
                      />
                      <button
                        onClick={() => deleteImage(index)}
                        className="absolute -top-2 -right-2 rounded-full bg-rose-500 hover:bg-white" 
                      >
                        <X />
                      </button>
                      <span className="text-black font-semibold  h-4 w-4 hover:text-white text-center">
                        ({index + 1})
                      </span>
                    </div>
                  );
                }
                if (fileType && fileType === "jpg") {
                  return (
                    <div
                      key={index}
                      className="relative rounded-lg h-[80px] w-[80px] flex  flex-col items-center justify-center cursor-pointer bg-orange-400"
                      
                    >
                      <Image
                        src="/jpeg.png"
                        alt="UploadFiles"
                        width={40}
                        height={40}
                        className="relative"
                      />
                      <button
                        onClick={() => deleteImage(index)}
                        className="absolute -top-2 -right-2 rounded-full bg-rose-500 hover:bg-white" 
                      >
                        <X />
                      </button>
                      <span className="text-black font-semibold  h-4 w-4 hover:text-white text-center">
                        ({index + 1})
                      </span>
                    </div>
                  );
                }
                
              })}
          </div>
        )}
      </div>
    </>
  );
};

export default UploadFile;
