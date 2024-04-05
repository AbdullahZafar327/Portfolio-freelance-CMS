"use client";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import {  X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface UploadProps {
  endPoint: "ProjectDeliver";
  onChange: (urls: string[]) => void; // Update the onChange function to accept an array of URLs
  value?: string[];
}

const UploadFinishedFiles = ({ endPoint, onChange, value }: UploadProps) => {
  const [loading, setLoading] = useState(false);

  const handleUploadComplete = (urls: string[]) => {
    const updatedUrls = [...(value ?? []), ...urls];
    onChange(updatedUrls);
  };

  const deleteImage = (index: number) => {
    const updateValue = [...(value ?? [])];
    const updatedValue = updateValue?.filter((url, i) => i !== index);
    onChange(updatedValue);
  };

  return (
    <>
      <div className="relative flex justify-center text-black font-semibold font-poppins items-center">
        <div
          className="p-8 border-2 border-black cursor-pointer rounded-3xl bg-black text-white  lg:h-[350px] lg:w-[500px] h-[250px] w-[250px] flex justify-center items-center font-poppins"
          style={{
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10px)",
          }}
        >
          <UploadButton
            endpoint={endPoint}
            onUploadBegin={() => {
              setLoading(true)
            }}
            onClientUploadComplete={(res) => {
              setLoading(false);
              handleUploadComplete(res?.map((file) => file.url) ?? []);
              setLoading(false);
            }}
            onUploadError={(error: Error) => {
              
            }}
            className="h-[150px] w-[250px] border-2 border-dashed border-white hover:bg-opacity-35 font-poppins text-white bg-black cursor-cell"
          />
        </div>
        {loading && (
            <>
             <div className="absolute top-1/2 left-1/2">
                <img src="/arrows.png" alt="loading" width={20} height={20} className="animate-spin"/>
             </div>
            </>
        )}
      </div>
      <div>
        <div className="w-full flex items-center justify-center">
          {value && value.length > 0 && (
            <div
              className="flex items-center gap-4 bg-white bg-opacity-40 h-[100px] md:w-[50%] w-full p-8 rounded-xl"
              style={{
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(10px)",
              }}
            >
              {value &&
                value.map((url, index) => (
                  <div
                    key={index}
                    className="relative rounded-lg h-[80px] w-[80px] flex  flex-col items-center justify-center cursor-pointer bg-white bg-opacity-25"
                    style={{
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <Image
                      src="/folder.png"
                      alt="UploadFiles"
                      width={40}
                      height={40}
                      className="relative"
                    />
                    <button
                      onClick={() => deleteImage(index)}
                      className="absolute -top-2 -right-2 rounded-full bg-white hover:bg-rose-300"
                    >
                      <X />
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UploadFinishedFiles;
