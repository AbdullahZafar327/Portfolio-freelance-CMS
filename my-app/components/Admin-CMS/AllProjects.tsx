"use client";

import useProjectsStore from "@/lib/projectStore";
import EachProject from "./EachProject";
import { useEffect } from "react";
import { ProjectWithUser } from "@/type";


const AllProjects = () => {
  const allProjects = useProjectsStore((state)=>state.allProjects)
  const fetchAllProjects = useProjectsStore((state)=>state.fetchAllProjects)

  useEffect(()=>{
   fetchAllProjects()
  },[])

 return(
   <>
   <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4">
            {allProjects.map((project: ProjectWithUser, i: number) => (
              <div className="col-span-1" key={i}>
                <EachProject project={project} />
              </div>
            ))}
          </div>
   </>
 )
}
export default AllProjects;
