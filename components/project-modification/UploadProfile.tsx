"use client";
import { UploadButton } from "@/lib/uploadthing";
import { Camera, LoaderIcon, X, XCircle } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import useProjectsStore from "@/lib/projectStore";
import { AnimatePresence, motion } from "framer-motion";
import { OurFileRouter } from "@/app/api/uploadthing/core";

interface UploadProps {
  endPoint: keyof OurFileRouter;
  onChange: (url?: string) => void;
  value?: string;
}

const UploadProfile = ({ endPoint, onChange, value }: UploadProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const { setIsUploading } = useProjectsStore();

  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <motion.div
        className="relative h-80 w-80 items-center justify-center rounded-full"
        onMouseEnter={() => {
          setShowOverlay(true);
        }}
        onMouseLeave={() => {
          setShowOverlay(false);
        }}
      >
        <Image
          fill
          src={value}
          alt="uploadImage"
          className="relative rounded-full"
        />
        <AnimatePresence>
          {showOverlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex items-center justify-center"
            >
              <div className="pointer-events-none bg-black/20 absolute w-full h-full rounded-full" />
              <div className="flex flex-col items-center">
                <motion.h1
                  initial={{ y: 10 }}
                  animate={{ y: 0 }}
                  exit={{ y: 10 }}
                  className="font-semibold text-white bg-white bg-opacity-10 flex rounded-full items-center gap-2 px-6 py-4 text-lg cursor-pointer z-10"
                >
                  {loading ? (
                    <>
                      <LoaderIcon className="animate-spin" />
                    </>
                  ) : (
                    <>
                      <UploadButton
                        endpoint={endPoint}
                        onUploadBegin={() => {
                          setIsUploading(true);
                          setLoading(true);
                        }}
                        onClientUploadComplete={(res) => {
                          setIsUploading(false);
                          setLoading(false);
                          onChange(res[0].url);
                        }}
                        onUploadError={(error: Error) => {
                          setError(true);
                          setTimeout(() => {
                            setError(false);
                          }, 3000);
                        }}
                      ></UploadButton>
                      <Camera />
                    </>
                  )}
                </motion.h1>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute rounded-full top-4 right-16 z-10">
          <button onClick={() => onChange("")}>
            <XCircle className="text-black h-8 w-8" fill="red" />
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <UploadButton
        endpoint={endPoint}
        onClientUploadComplete={(res) => {
          setIsUploading(false);
          setLoading(false);
          onChange(res[0]?.url);
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
        onUploadBegin={(file) => {
          setIsUploading(true);
          setLoading(true);
        }}
        className="bg-black bg-opacity-35 w-[300px]"
      />
    </>
  );
};

export default UploadProfile;
