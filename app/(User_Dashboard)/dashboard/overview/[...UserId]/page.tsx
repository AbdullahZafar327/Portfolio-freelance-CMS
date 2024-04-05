import AllProjects from "@/components/Admin-CMS/AllProjects";
import ProjectCard from "@/components/projectCards/ProjectCard";
import ProjectQueueCard from "@/components/projectCards/ProjectQueueCard";
import Header from "@/components/dashboard/header";
import { currentUser } from "@/lib/current-user";
import ConnectedToDb from "@/lib/dbConnection";
import { IProject, Project, Role, User, status } from "@/lib/mongodb";
import { ProjectWithUser } from "@/type";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ShowToast from "@/components/ShowToast";

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
  const PlainTotalProjects = JSON.parse(JSON.stringify(TotalProjects));

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
    <>
    <ShowToast/>
    <div className="overflow-y-auto p-4 h-full w-full">
      <Header title="Projects Overview" />
      {admin ? (
        <>
          <AllProjects/>
          {PlainTotalProjects.length < 0 && (
            <div className="flex items-center justify-center">
              <h1 className="font-bold">NO PROJECTS</h1>
              <div>
                <Image
                  src="/rest.png"
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
          <div className="w-full flex items-center justify-between pl-8 font-poppins">
            <h1 className="flex items-center gap-4 font-light lg:text-3xl text-xl">
              In Progress
              <Image
                src="/progress.png"
                alt="progress"
                width={30}
                height={30}
              />
            </h1>
            <Link
              href="/createProject"
              className="flex font-poppins  items-center justify-center gap-2 text-white bg-gradient-to-r cursor-pointer from-purple-500 to-violet-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-violet-500/50 dark:shadow-lg dark:shadow-violet-800/80 font-medium rounded-lg text-sm px-4 py-4 text-center me-2 mb-2"
            >
              New Project <Plus />
            </Link>
          </div>
          <div className="grid xl:grid-cols-3 grid-cols-1 gap-4">
          <div className="col-span-2 flex flex-col">
            {inProgressProjects.length <= 0 ? (
              <>
                <div
                  className="relative col-span-2 flex items-center justify-center bg-white bg-opacity-25 rounded-3xl h-[400px]"
                  style={{
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div className="relative flex flex-col items-center justify-center w-full h-full">
                    <Image
                      src="/rest.png"
                      width={120}
                      height={120}
                      alt="noProgress"
                      priority
                    />
                    <p className="font-light text-lg w-full text-center">
                      No projects are in progress.
                    </p>
                  </div>
                </div>
              </>
            ) : (
             
                <div
                  className="grid 2xl:grid-cols-3 xl:grid-cols-2 grid-cols-1 mt-4 pl-8 p-4 gap-8 bg-white bg-opacity-25 rounded-xl"
                  style={{
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {inProgressProjects.map((project: IProject, i: number) => (
                    <div className="col-span-1 " key={i}>
                      <ProjectCard project={project} />
                    </div>
                  ))}
                </div>
                
            
            )}

               <div className="w-full flex items-center justify-between pl-8 font-poppins p-4">
                  <h1 className="flex items-center gap-4 font-light lg:text-3xl text-xl">
                    In Queue
                    <Image
                      src="/hourglass.png"
                      width={30}
                      height={30}
                      alt="queue"
                    />
                  </h1>
                </div>
                <div
                  className="grid xl:grid-cols-2 grid-cols-1 mt-4 pl-4  gap-8 bg-white bg-opacity-25 rounded-xl"
                  style={{
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div className="col-span-2">
                  <div
                    className="grid 2xl:grid-cols-3 xl:grid-cols-2 grid-cols-1 gap-4 p-4 rounded-xl"
                  >
                    {inQueueOrRejectedProjects.length <= 0 ? (
                      <>
                        <div className="relative col-span-3 flex items-center justify-center rounded-3xl">
                          <div className="relative flex flex-col items-center justify-center">
                            <p className="text-center font-semibold">
                              The Queue is Empty.
                            </p>
                            <Image
                              src="/search.png"
                              width={150}
                              height={150}
                              alt="noProgress"
                              priority
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {inQueueOrRejectedProjects.map(
                          (project: IProject, i: number) => (
                            <div className="col-span-1" key={i}>
                              <ProjectQueueCard
                                project={JSON.parse(JSON.stringify(project))}
                                user={JSON.parse(JSON.stringify(user))}
                              />
                            </div>
                          )
                        )}
                      </>
                    )}
                  </div>
                </div>
                </div>
                </div>
            <div
              className="col-span-1 flex bg-white bg-opacity-25 rounded-lg p-4"
              style={{
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="flex flex-col w-full">
                <div className="flex justify-center">
                  <h1 className="flex items-center gap-4 font-semibold lg:text-6xl text-3xl text-center font-poppins">
                    All projects
                    <Image
                      src="/layers.png"
                      alt="allProjects"
                      width={30}
                      height={30}
                    />
                  </h1>
                </div>
                <div className="flex flex-col p-8 items-center">
                  <p className="flex items-center gap-4 font-extraLight xl:text-2xl text-xl font-karla">
                    In Progress
                    <Image
                      src="/progress.png"
                      alt="In Progress"
                      width={30}
                      height={30}
                    />
                  </p>
                  <div className="flex items-center justify-center">
                    <span className="font-semibold md:text-3xl text-2xl font-poppins">
                      {InProgressAllProjects.length}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col p-8 items-center">
                  <p className="flex items-center gap-4 font-extraLight xl:text-2xl text-xl font-karla">
                    Upcoming
                    <Image
                      src="/schedule.png"
                      alt="Upcoming"
                      width={30}
                      height={30}
                    />
                  </p>
                  <div className="flex items-center justify-center">
                    <span className="font-semibold md:text-3xl text-2xl font-poppins">
                      {inQueueAllProjects.length}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col p-8 items-center">
                  <p className="flex items-center gap-4 font-extraLight xl:text-2xl text-xl font-karla">
                    Total Projects
                    <Image
                      src="/loading-bar.png"
                      alt="total"
                      width={30}
                      height={30}
                    />
                  </p>
                  <div className="flex items-center justify-center">
                    <span className="font-semibold md:text-3xl text-2xl font-poppins">
                      {TotalProjects.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
    </>
  );
};

export default page;
