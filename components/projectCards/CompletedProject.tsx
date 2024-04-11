"use client";
import { IProject } from "@/lib/mongodb";
import { Check, CheckCheck, Download, DownloadCloud } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

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

  if (!completed_P) {
    return <Skeleton count={5} />;
  }


  return (
    <>
      <div className="flex flex-col bg-black rounded-xl text-white w-full p-4">
        <div className="flex items-center justify-center p-2">
          <p className="font-bold 2xl:text-2xl text-xl text-center font-serif">
            {project_type }
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
            <div className="flex items-center justify-between gap-4 w-full">
              <p className="font-serif font-bold">Download Files</p>
              <span>
                <DownloadCloud className="h-4 w-4" />
              </span>
            </div>
            {FinishedFiles.length > 0 && (
              <div className="bg-white bg-opacity-50 rounded-lg w-full p-4 flex gap-4">
                {FinishedFiles.map((url, index) => (
                  <div className="flex items-center flex-col" key={url}>
                    <Image
                      src="/zip-folder.png"
                      width={40}
                      height={40}
                      alt="ProjectFiles"
                    />
                    <Link
                      href={url}
                      className="flex items-center justify-center"
                    >
                      <Download className="h-8 w-8 hover:bg-black hover:bg-opacity-25 rounded-full p-1" />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CompletedProject;
