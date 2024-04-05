"use client";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import { Loader, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import motion from 'framer-motion'
import useProjectsStore from "@/lib/projectStore";

interface UploadProps {
  endPoint: "Uploader";
  onChange: (urls: string[]) => void; // Update the onChange function to accept an array of URLs
  value?: string[];
}

const UploadfileonCard = ({ endPoint, onChange, value }: UploadProps) => {
  const [loading, setLoading] = useState(false);
  const [error , setError] = useState(false)
  const handleUploadComplete = (urls: string[]) => {
    const updatedUrls = [...(value ?? []), ...urls];
    onChange(updatedUrls);
  };
  const { isUploading, setIsUploading } = useProjectsStore();

  const deleteImage  = (index:number) => {
    const updateValue = [...(value ?? [])];
    const updatedValue = updateValue?.filter((url,i) => i !== index)
    onChange(updatedValue)
  }

  return (
    <>
    {error && (
          <div className="flex text-center justify-center text-black">
            <p className="font-light font-poppins text-rose-500">File size is bigger than 4mb.Please upload small size file</p>
          </div>
      )}
      <div className="relative flex justify-center text-black font-semibold font-poppins items-center">
        <div
          className=" border-2 border-black cursor-pointer rounded-3xl bg-black text-white  w-full flex justify-center items-center font-poppins"
          style={{
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10px)",
          }}
        >
          {value && value?.length < 5 ? (
            <UploadButton
              endpoint={endPoint}
              
              onUploadBegin={()=>{
                setIsUploading(true)
              }}
              onClientUploadComplete={(res) => {
               setIsUploading(false)
                handleUploadComplete(res?.map((file) => file.url) ?? []);
                setLoading(false);
              }}
              onUploadError={(error: Error) => {
                setError(true)
                setTimeout(()=>{
                  setError(false)
                },3000)
               
              }}
              
              className=" h-[100px] w-[100px] border-2 border-dashed border-white hover:bg-opacity-35 font-poppins text-white bg-black hover:bg-white cursor-cell flex text-xs text"
            />
          ):(
            <div className="flex items-center justify-center">
            <Image height={200} width={200} src="/denied.png" alt="limitCrossed" />
            </div>
          )} 
        </div>
      </div>
      <div>
      {value&& value.length >= 5 && (
            <div className="flex justify-center">
               <p className="font-light text-rose-700 text-center text-xs font-poppins">Cannot Upload more than 5 Files!</p>
            </div>
          )}
      <div className="w-full flex items-center justify-center">
        {value && value.length>0 && (
          <div className="flex items-start p-1 gap-1 bg-white bg-opacity-40 h-[100px] w-full rounded-xl"
          style={{
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10px)",
          }}
          >
            {value &&
              value.map((url, index) => {
                const fileType = url.split(".").pop();
                if (fileType && fileType === "png") {
                  return (
                    <div
                      key={index}
                      className="relative rounded-lg h-[50px] w-[50px] flex  flex-col items-center justify-center cursor-pointer bg-white bg-opacity-25"
                      style={{
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        backdropFilter: "blur(10px)",
                      }}
                      
                    >
                      <Image
                        src="/png.png"
                        alt="UploadFiles"
                        width={30}
                        height={30}
                        className="relative"
                      />
                      <button
                        onClick={() => deleteImage(index)}
                        className="absolute -top-2 -right-2 rounded-full bg-white text-black hover:bg-rose-300 P-4" 
                      >
                        <X />
                      </button>
                
                    </div>
                  );
                }
                if (fileType && fileType === "pdf") {
                  return (
                    <div
                      key={index}
                      className="relative rounded-lg h-[30px] w-[30px] flex  flex-col items-center justify-center cursor-pointer bg-white bg-opacity-25"
                      style={{
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <Image
                        src="/pdf.png"
                        alt="UploadFiles"
                        width={20}
                        height={20}
                        className="relative"
                      />
                      <button
                        onClick={() => deleteImage(index)}
                        className="absolute -top-2 -right-2 rounded-full bg-white hover:bg-rose-300" 
                      >
                        <X />
                      </button>
                  
                    </div>
                  );
                }
                if (fileType && fileType === "jpg") {
                  return (
                    <div
                      key={index}
                      className="relative rounded-lg h-[30px] w-[30px] flex  flex-col items-center justify-center cursor-pointer bg-white bg-opacity-25"
                      style={{
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <Image
                        src="/jpeg.png"
                        alt="UploadFiles"
                        width={20}
                        height={20}
                        className="relative"
                      />
                      <button
                        onClick={() => deleteImage(index)}
                        className="absolute -top-2 -right-2 rounded-full bg-white hover:bg-rose-300" 
                      >
                        <X />
                      </button>
                    </div>
                  );
                }
                
              })}
          </div>
        )}
        </div>
      </div>
    </>
  );
};

export default UploadfileonCard;
