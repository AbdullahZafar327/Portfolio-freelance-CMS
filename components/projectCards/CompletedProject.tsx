"use client";
import { IProject } from "@/lib/mongodb";
import { Check, CheckCheck, Download, DownloadCloud } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { AccordionContent } from "@radix-ui/react-accordion";
import { AnimatePresence, motion } from "framer-motion";

interface Finished_ProjectsProps {
  completed_P: IProject;
}

const CompletedProject = ({ completed_P }: Finished_ProjectsProps) => {
  const {
    project_title,
    project_status,
    projectFiles,
    project_type,
    FinishedFiles,
  } = completed_P;
  const [showOverlay, setShowOverlay] = useState(false);

  const handleDownload = (fileUrl: string) => {
    fetch(fileUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          fileUrl.split("/").pop() || "downloaded-file"
        );
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      })
      .catch((error) => console.error("Error downloading file:", error));
  };

  return (
    <>
      <div className="flex flex-col bg-black rounded-xl text-white w-full p-4">
        <div className="flex items-center justify-center p-2">
          <p className="font-bold 2xl:text-2xl text-xl text-center font-serif">
            {project_type}
          </p>
        </div>
        <div className="flex flex-col mt-4">
          <div className="flex items-center justify-center w-full">
            <p className="font-bold font-serif">Status&nbsp;:</p>
            <div className=" ml-2 flex items-center justify-between px-2 py-1 bg-green-400 text-white rounded-xl">
              <p className="font-bold text-xs">{project_status}</p>
              <CheckCheck className="h-4 w-4" />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex items-center justify-between gap-4 w-full">
                    <p className="font-serif font-bold">Download Files</p>
                    <span>
                      <DownloadCloud className="h-4 w-4" />
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="bg-white bg-opacity-25 flex items-center gap-1 p-1">
                    {FinishedFiles.map((url, index) => {
                      const fileType = url.split(".").pop();
                      return (
                        <motion.div
                          onHoverStart={() => setShowOverlay(true)}
                          onHoverEnd={() => setShowOverlay(false)}
                          key={index}
                          className="relative rounded-lg h-[80px] w-[80px] flex flex-col items-center justify-center cursor-pointer bg-orange-400"
                        >
                          {fileType && fileType === "png" && (
                            <>
                              <Image
                                src="/png.png"
                                alt="UploadFiles"
                                width={60}
                                height={60}
                                className="relative"
                              />
                              <AnimatePresence>
                                {showOverlay && (
                                  <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 z-10 flex items-center justify-center"
                                    style={{
                                      transform: "translateZ(75px)",
                                      transformStyle: "preserve-3d",
                                    }}
                                  >
                                    <div className="pointer-events-none bg-black/20 absolute w-full h-full" />
                                    <button
                                      onClick={() => handleDownload(url)}
                                      className="flex items-center gap-2"
                                    >
                                      <Download className="h-10 w-10 hover:bg-black hover:text-white rounded-full p-2" />
                                    </button>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompletedProject;
