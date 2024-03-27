"use client";
import { IProject, IUser, Role, User } from "@/lib/mongodb";
import React, { useState } from "react";
import { Clock, Frown, Loader2Icon, Smile } from "lucide-react";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";
import { redirectToSignIn } from "@clerk/nextjs";
import DropDownMenu from "./DropDownMenu";
import axios from "axios";

interface ProjectQueueCardProps {
  project: IProject;
  user: IUser;
}
const ProjectQueueCard = ({ project, user }: ProjectQueueCardProps) => {
  const { project_type, project_status, createdAt, project_progress } = project;
  const [currentProject, setCurrentProject] = useState(project);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!user) {
    return redirectToSignIn();
  }

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "inQueue":
        return "bg-yellow-500";
      case "rejected":
        return "bg-rose-500";
      default:
        return "";
    }
  };
  const getStatusText = (status: string): JSX.Element => {
    switch (status) {
      case "inQueue":
        return (
          <span className="flex items-center gap-2">
            <Clock /> Waiting
          </span>
        );
      case "rejected":
        return (
          <span className="flex items-center gap-2">
            <Frown /> Rejected
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
          <p className="flex text-lg text-center gap-2 items-center">
            Thank you for your patience! I'll be starting on your project soon.
            <Smile className="text-black" fill="yellow" />
          </p>
        );
      case "rejected":
        return (
          <p className="flex text-lg text-center gap-2 items-center">
            I'm sorry, but your project has been rejected.Please try again later!
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
      setIsDeleting(false);
    } catch (error) {
      console.log("ERROR WHILE DELETING PROJECT", error);
      setIsDeleting(false)
    }
  };

  return (
    <div className="relative flex flex-col p-2 mt-4 bg-[#65E4A3] rounded-3xl">
      {isDeleting && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25 z-10 rounded-3xl">
          <Loader2Icon className="animate-spin text-white" />
        </div>
      )}
      <div className="flex flex-col p-2">
        <div className="flex items-start justify-between">
          {/* //@ts-ignore */}
          <p className="font-semibold text-lg">{createdAt?.split("T")[0]}</p>
          <span>
            <span>
              <DropDownMenu handleChange={DeleteProject} />
            </span>
          </span>
        </div>

        <div className="flex items-center justify-center p-8">
          <p className="font-bold text-3xl text-center">
            {currentProject.project_type}
          </p>
        </div>

        <div className="flex flex-col gap-2 items-start">
          <p className="font-semibold text-lg">Progress</p>
          <Progress value={currentProject.project_progress} />
          <div className="flex flex-row-reverse items-end w-full">
            <span className="font-semibold ">
              {project_progress.toString()}%
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <p className="font-semibold text-lg">Project Status</p> :
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
            <p className="font-semibold text-lg">Project CreatedBy</p> :
            <span>{user.user_name.toString().toLowerCase()}</span>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2">
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
