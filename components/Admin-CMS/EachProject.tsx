"use client"
import { status } from "@/lib/mongodb";
import { Loader2, Loader2Icon } from "lucide-react";
import React, { useState } from "react";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import ProfileAvatar from "../custom-ui/ProfileAvatar";
import ProjectAccordion from "../custom-ui/ProjectAccordian";
import { ProjectWithUser } from "@/type";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Slider } from "../ui/slider";
import DropDownMenu from "../dashboard/DropDownMenu";
import useProjectsStore from "@/lib/projectStore";

const EachProject = ({ project }: { project: ProjectWithUser }) => {
    const {
        _id,
        project_type,
        project_progress,
        project_title,
        project_requirements,
        project_description,
        project_status,
        projectFiles,
        FinishedFiles,
        createdAt,
        project_user,
      } = project;
      const { user_name, user_email, user_image } = project_user;
      const [currentProject, setCurrentProject] = useState(project);
      const [isLoading, setIsLoading] = useState(false);
      const [isDeleting, setIsDeleting] = useState(false);
      const router = useRouter();
      const fetchAllProjects = useProjectsStore((state)=>state.fetchAllProjects)
    
      const updateProjectStatus = async (status: string) => {
        const updateStatus = async () => {
          try {
            setIsLoading(true);
            if(currentProject._id || _id){
              const response = await axios.patch(
                `/api/updateProject/${currentProject._id||_id}`,
                { project_status: status }
              );
              setCurrentProject(response.data);
              fetchAllProjects()
              setIsLoading(false);
              router.refresh();
            }
          } catch (error) {
            console.log("Error occurred while updating the project");
          }
        };
    
        updateStatus();
      };
  
    
      const DeleteProject = async () => {
        try {
          setIsDeleting(true);
          if(currentProject._id || _id){
            const response = await axios.delete(
              `/api/updateProject/${currentProject._id || _id}`
            );
            setCurrentProject(response.data);
            setIsDeleting(false);
            fetchAllProjects()
            router.refresh()
          }
          
        } catch (error) {
          console.log("ERROR WHILE DELETING PROJECT", error);
        }
      };
    
      const EditProject = async (value: any) => {
        try {
          const response = await axios.patch(
            `/api/updateProject/${currentProject._id}`,
            value
          );
          setCurrentProject(response.data);
        } catch (error) {
          console.log("ERROR WHILE UPDATING THE PROJECT", error);
        }
      };
    
      return (
        <>
          <div className="relative flex flex-col p-2 mt-4 bg-black font-poppins text-white rounded-3xl">
            {isDeleting && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25 z-10 rounded-3xl">
                <Loader2Icon className="animate-spin text-white" />
              </div>
            )}
            <div className="flex flex-col p-2">
              <div className="flex items-start justify-between">
                {/* //@ts-ignore */}
                <p className="font-semibold text-lg">{currentProject.createdAt?.toString().split("T")[0] || createdAt?.toString().split("T")[0] }</p>
                <span>
                  <DropDownMenu handleChange={DeleteProject} isDeleting={isDeleting} />
                </span>
              </div>
    
              <div className="flex items-center justify-center p-8">
                <p className="font-bold text-3xl text-center">{currentProject.project_type || project_type}</p>
              </div>
              <div className="flex flex-col gap-2">
                <ProjectAccordion
                  content={currentProject?.project_title || project_title}
                  label="Project Title"
                />
                <ProjectAccordion
                  content={currentProject?.project_requirements || project_requirements}
                  label="Project Requirements"
                />
                <ProjectAccordion
                  content={currentProject?.project_description || project_description}
                  label="Project Description"
                />
                <ProjectAccordion
                  content={currentProject?.project_status || project_status}
                  label="Project Status"
                />
                <ProjectAccordion
                  files={currentProject?.projectFiles || projectFiles}
                  label="Download Files"
                />
              </div>
              {isLoading && (
                <div className="flex items-center justify-center">
                  <Loader2 className="animate-spin text-blue-500" />
                </div>
              )}
              <div className="w-full flex items-center justify-center">
                <button
                  onClick={() => updateProjectStatus(status.inProgress)}
                  className="text-white  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
                >
                  inProgress
                </button>
                <button
                  onClick={() => updateProjectStatus(status.completed)}
                  className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  completed
                </button>
                <button
                  onClick={() => updateProjectStatus(status.inQueue)}
                  className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  InQueue
                </button>
                <button
                  onClick={() => updateProjectStatus(status.rejected)}
                  className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Reject
                </button>
              </div>
    
              <div className="mt-10 flex flex-col gap-2">
                <Separator />
                <div className="flex items-center gap-2">
                  <ProfileAvatar imageSrc={user_image} />
                  <p className="font-bold">{user_name}</p>
                  <span>{user_email}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    };

export default EachProject
