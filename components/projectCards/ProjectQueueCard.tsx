"use client";
import { IProject, IUser, Role, User } from "@/lib/mongodb";
import React, { useState } from "react";
import { Clock, Clock12, Frown, Loader2Icon, Smile } from "lucide-react";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { redirectToSignIn } from "@clerk/nextjs";
import DropDownMenu from "../dashboard/DropDownMenu";
import axios from "axios";
import Image from "next/image";

interface ProjectQueueCardProps {
  project: IProject;
  user: IUser;
}
const ProjectQueueCard = ({ project, user }: ProjectQueueCardProps) => {
  const { project_progress, paid } = project;
  const [currentProject, setCurrentProject] = useState(project);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!user) {
    return redirectToSignIn();
  }

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "inQueue":
        return "bg-yellow-300";
      case "rejected":
        return "bg-red-200";
      default:
        return "";
    }
  };
  const getStatusText = (status: string): JSX.Element => {
    switch (status) {
      case "inQueue":
        return (
          <span className="flex items-center gap-2 text-sm font-poppins text-black">
            <Image src="/hourglass.png" alt="waiting" height={20} width={20} />{" "}
            Waiting
          </span>
        );
      case "rejected":
        return (
          <span className="flex items-center gap-2 text-sm text-black">
            <Image src="/reject.png" alt="reject" height={20} width={20} />{" "}
            Rejected
          </span>
        );
      default:
        return <span></span>;
    }
  };

  const getStatusMessage = (status: string): JSX.Element => {
    switch (status) {
      case "inQueue":
        return (
          <p className="flex text-sm text-center gap-2 items-center font-light font-poppins">
            Thank you for your patience! I will be starting on your project soon
            <Smile className="text-black" fill="yellow" />
          </p>
        );
      case "rejected":
        return (
          <p className="flex text-sm text-center gap-2 items-center font-poppins font-light">
            I&apos;m sorry&lsquo; but your project has been rejected.Please try again
            later!
            <Frown className="text-black" fill="red" />
          </p>
        );
      default:
        return <span></span>;
    }
  };

  const DeleteProject = async () => {
    try {
      setIsDeleting(true);
      const response = await axios.delete(
        `/api/updateProject/${currentProject._id}`
      );
      setCurrentProject(response.data);
      window.location.reload()
      setIsDeleting(false);
    } catch (error) {
      console.log("ERROR WHILE DELETING PROJECT", error);
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative flex flex-col p-4 bg-black text-white rounded-3xl font-poppins">
      {isDeleting && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25 z-10 rounded-3xl">
          <Loader2Icon className="animate-spin text-white" />
        </div>
      )}
      <div className="flex flex-col p-2">
        <div className="flex items-start justify-between">
          {/* //@ts-ignore */}
          <p className="font-semibold text-sm">
            {currentProject.createdAt?.toString().split("T")[0]}
          </p>
          <span>
            <span>
              <DropDownMenu handleChange={DeleteProject} isDeleting={isDeleting} />
            </span>
          </span>
        </div>

        <div className="flex items-center justify-center p-1">
          <p className="font-light 2xl:text-2xl text-xl text-center font-poppins">
            {currentProject.project_type}
          </p>
        </div>

        <div className="flex flex-col gap-2 items-start">
          <p className="font-light text-sm">Progress</p>
          <Progress value={currentProject.project_progress} />
          <div className="flex flex-row-reverse items-end w-full">
            <span className="font-light font-poppins ">
              {project_progress.toString()}%
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <p className="font-semibold text-sm font-poppins">Status</p> :
              <span
                className={cn(
                  "rounded-3xl px-4 py-2",
                  getStatusColor(currentProject.project_status)
                )}
              >
                {getStatusText(currentProject.project_status)}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <p className="font-semibold text-sm font-poppins">CreatedBy</p> :
              <span className="font-poppins font-light text-sm">
                {user.user_name.toString().toLowerCase()}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <p className="font-semibold text-sm font-poppins">Paid</p> :
              <span className="font-poppins font-light text-sm">
                {paid === false ? (
                  <div className="bg-red-600 px-2 py-1 rounded-lg font-poppins text-xs items-center text-center font-normal">
                    {paid.toString()}
                  </div>
                ) : (
                  <div className="bg-green-600 px-2 py-1 rounded-lg font-poppins text-xs items-center text-center font-normal">
                    {paid.toString()}
                  </div>
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-2 flex flex-col gap-2">
          <Separator />
          <div className="flex items-center gap-2">
            {getStatusMessage(currentProject.project_status)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectQueueCard;
