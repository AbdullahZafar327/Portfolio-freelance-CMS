"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { Download, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface AccordionProjectProps {
  label: string;
  content?: string;
  price?:number;
  files?: string[];
}
const ProjectAccordion = ({ content, label, files,price }: AccordionProjectProps) => {
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
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>{label}</AccordionTrigger>
          <AccordionContent className="flex gap-2 bg-white bg-opacity-40 p-2 rounded-xl">
            {content && <p className="text-white font-poppins text-sm">{content}</p>}
            {price && <p className="text-white z-10">{price}$</p>}
            {files &&
              files.map((url, index) => {
                const fileType = url.split(".").pop();
                return (
                  <motion.div
                    onHoverStart={() => setShowOverlay(true)}
                    onHoverEnd={() => setShowOverlay(false)}
                    key={index}
                    className="relative rounded-lg h-[80px] w-[80px] flex  flex-col items-center justify-center cursor-pointer bg-orange-400"
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
                              <div className="pointer-events-none bg-black/20 absolute w-full h-full " />
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

                    {fileType && fileType === "pdf" && (
                      <>
                        <Image
                          src="/pdf.png"
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
                              <div className="pointer-events-none bg-black/20 absolute w-full h-full " />
                              <button
                                className="flex items-center gap-2"
                                onClick={() => handleDownload(url)}
                              >
                                <Download className="h-10 w-10 hover:bg-black hover:text-white rounded-full p-2" />
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                    {fileType && fileType === "jpg" && (
                      <>
                        <Image
                          src="/jpeg.png"
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
                              <div className="pointer-events-none bg-black/20 absolute w-full h-full " />
                              <button
                                className="flex items-center gap-2"
                                onClick={() => handleDownload(url)}
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProjectAccordion;
