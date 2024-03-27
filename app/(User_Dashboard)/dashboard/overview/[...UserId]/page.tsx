import AllProjects from "@/components/AllProjects";
import ProjectCard from "@/components/ProjectCard";
import ProjectQueueCard from "@/components/ProjectQueueCard";
import Header from "@/components/header";
import { currentUser } from "@/lib/current-user";
import ConnectedToDb from "@/lib/dbConnection";
import { IProject, Project, Role, User, status } from "@/lib/mongodb";
import { ProjectWithUser } from "@/type";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }
  await ConnectedToDb();
  const DataBaseUser = await User.findOne({ _id: user?._id }).populate(
    "user_projects"
  );
  const InProgressAllProjects = await Project.find({
    project_status: status.inProgress,
  });
  const inQueueAllProjects = await Project.find({
    project_status: status.inQueue,
  });

  const TotalProjects = await Project.find();
  const PlainTotalProjects = JSON.parse(JSON.stringify(TotalProjects))

  const projects = DataBaseUser.user_projects;

  const inProgressProjects = await Project.find({
    project_user: user._id,
    project_status: status.inProgress,
  });

  const inQueueOrRejectedProjects = await Project.find({
    project_user: user._id,
    $or: [
      { project_status: status.inQueue },
      { project_status: status.rejected },
    ],
  });

  const admin = user.role === Role.Admin;

  return (
    <div className="overflow-y-auto p-4 h-full w-full">
      <Header title="Welcome to your Dashboard!🎉🥳" />
      {admin ? (
        <>
        <div className="grid grid-cols-4 gap-4">
           {PlainTotalProjects.map((project:ProjectWithUser,i:number)=>(
            <div className="col-span-1" key={i}>
              <AllProjects project={project}/>
            </div>
           ))}
        </div>
      {PlainTotalProjects.length < 0 && (
        <div className="flex items-center justify-center">
          <h1 className="font-bold">NO PROJECTS</h1>
          <div>
          <Image
                      src="/sleepingcat.gif"
                      width={500}
                      height={500}
                      alt="noProjects"
                    />
                     </div>
        </div>
      )}
        </>
      ) : (
        <>
          <div className="w-full flex items-center justify-between pl-8">
            <h1 className="font-semibold text-[40px]">Projects in Progress</h1>
            <Link
              href="/createProject"
              className="flex items-center justify-center gap-2 text-white bg-gradient-to-r cursor-pointer from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-6 py-4 text-center me-2 mb-2"
            >
              Create New Project <Plus />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {inProgressProjects.length <= 0 ? (
              <>
                <div className="relative col-span-2 flex items-center justify-center bg-white bg-opacity-25 rounded-3xl">
                  <div className="relative flex flex-col items-center">
                  <p className="absolute top-3/4 font-semibold">
                     No projects are in progress. Please wait
                    </p>
                    <Image
                      src="/sleepingcat.gif"
                      width={500}
                      height={500}
                      alt="noProgress"
                      priority
                    />
                    
                  </div>
                </div>
              </>
            ) : (
              <div className="col-span-2">
                <div className="grid grid-cols-2 mt-4 pl-8 gap-8">
                  {inProgressProjects.map((project: IProject, i: number) => (
                    <div className="col-span-1" key={i}>
                      <ProjectCard project={project} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="col-span-1 flex">
              <div className="bg-black/50 h-[600px] w-[4px]" />
              <div className="flex flex-col w-full">
                <div className="flex justify-center">
                  <h1 className="font-bold text-3xl text-center">
                    All projects
                  </h1>
                </div>
                <div className="flex flex-col p-8">
                  <p className="font-bold text-3xl">In Progress</p>
                  <div className="flex items-center justify-center">
                    <span className="font-semibold text-6xl">
                      {InProgressAllProjects.length}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col p-8">
                  <p className="font-bold text-3xl">Upcoming</p>
                  <div className="flex items-center justify-center">
                    <span className="font-semibold text-6xl">
                      {inQueueAllProjects.length}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col p-8">
                  <p className="font-bold text-3xl">Total Projects</p>
                  <div className="flex items-center justify-center">
                    <span className="font-semibold text-6xl">
                      {TotalProjects.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-between pl-8">
            <h1 className="font-semibold text-[40px]">Projects in Queue</h1>
            <Link
              href="/createProject"
              className="flex items-center justify-center gap-2 text-white bg-gradient-to-r cursor-pointer from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-6 py-4 text-center me-2 mb-2"
            >
              Create New Project <Plus />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {inQueueOrRejectedProjects.length <= 0 ? (
              <>
                <div className="relative col-span-2 flex items-center justify-center bg-white bg-opacity-25 rounded-3xl">
                  <div className="relative flex flex-col items-center">
                  <p className="absolute top-3/4 font-semibold">The Queue is Empty.</p>
                    <Image
                      src="/catmusic.gif"
                      width={300}
                      height={300}
                      alt="noProgress"
                      priority
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                {inQueueOrRejectedProjects.map((project: IProject, i: number) => (
                  <div className="col-span-1" key={i}>
                    <ProjectQueueCard project={JSON.parse(JSON.stringify(project))} user={JSON.parse(JSON.stringify(user))} />
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default page;
