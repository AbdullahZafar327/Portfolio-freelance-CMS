import { IProject, Role, User } from "@/lib/mongodb";
import React from "react";
import { MoreVerticalIcon } from "lucide-react";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import ProfileAvatar from "../custom-ui/ProfileAvatar";
import { currentUser } from "@/lib/current-user";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";

const ProjectCard = async ({ project }: { project: IProject }) => {
  const { project_type, createdAt, project_progress, paid } = project;
  const Admin = await User.findOne({ role: Role.Admin });
  const user = await currentUser();

  if(!project){
    return <Skeleton count={5}/>
  }

  return (
    <div className="flex flex-col p-2 bg-black rounded-3xl text-white">
      <div className="flex flex-col p-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm font-poppins">
              {createdAt?.toISOString().split("T")[0]}
            </p>
            <div className="flex items-center gap-1 bg-green-200 rounded-xl px-2 py-1">
              <Image src="/verify.png" alt="approved" height={20} width={20} />
              <p className="text-[10px] font-poppins text-black">Approved</p>
            </div>
          </div>
          <span>
            <MoreVerticalIcon className="bg-none hover:bg-white/50 rounded-full cursor-pointer" />
          </span>
        </div>

        <div className="flex items-center justify-center p-2">
          <p className="font-light 2xl:text-2xl text-xl text-center font-poppins">
            {project_type}
          </p>
        </div>

        <div className="flex flex-col gap-2 items-start">
          <p className="font-light text-sm font-poppins">Progress</p>
          <Progress value={project_progress} />
          <div className="flex flex-row-reverse items-end w-full">
            <span className="font-light font-poppins ">
              {project_progress.toString()}%
            </span>
          </div>
          <div className="flex items-center gap-4">
            <p>Paid :</p>
            {paid === false ? (
              <div className="bg-red-600 px-2 py-1 rounded-lg font-poppins text-xs items-center text-center font-normal">
                {paid.toString()}
              </div>
            ) : (
              <div className="bg-green-600 px-2 py-1 rounded-lg font-poppins text-xs items-center text-center font-normal">
                {paid.toString()}
              </div>
            )}
          </div>
        </div>

        <div className="mt-2 flex flex-col gap-2">
          <Separator />
          <div className="flex items-center gap-2">
            <ProfileAvatar imageSrc={Admin.user_image} />
            <p className="text-sm font-light font-poppins">
              {Admin.user_name} is working on your project...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
