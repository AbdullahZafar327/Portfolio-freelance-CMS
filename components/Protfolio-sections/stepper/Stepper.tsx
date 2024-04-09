"use client";
import React, { useContext, useEffect, useState } from "react";
import "./stepper.css";
import { motion } from "framer-motion";
import { Check, Download, Eye, PersonStanding, Plus } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { cn } from "@/lib/utils";
import axios from "axios";
import useProjectsStore from "@/lib/projectStore";

const Stepper = () => {
  const { userId } = useAuth();
  const [userProjects, setUserProjects] = useState([]);
  const {setIsLoading} = useProjectsStore()
  const isAuth = !!userId;

  useEffect(() => {
    const fetchUserProjects = async () => {
      try {
        const response = await axios.get("/api/CreateProject");
        setUserProjects(response.data);
      } catch (error) {
        console.log("UserProjects Get error", error);
      }
    };

    fetchUserProjects();
  }, [userProjects.length]);

  
  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 4000); 
  };

  const hasProjects = userProjects && userProjects.length > 0;

  const steps = [
    {
      name: !isAuth ? "Sign Up" : "Signed",
      icon: isAuth ? <Check /> : <PersonStanding />,
      link: !isAuth ? "/sign-up" : "",
      color: !isAuth ? "teal" : "green",
    },
    {
      name: hasProjects ? "project created" : "Create Project",
      icon: hasProjects ? <Check /> : <Plus />,
      link: "/createProject",
      color: "teal",
    },
    {
      name: "Watch Progress",
      icon: <Eye />,
      link: `/dashboard/overview/${userId}`,
      color: "teal",
    },
    {
      name: "Done",
      icon: <Check />,
      link: "/dashboard",
      color: "teal",
    },
    {
      name: "Download",
      icon: <Download />,
      link: "/dashboard",
      color: "teal",
    },
  ];

  return (
    <div className="p-10 flex items-center justify-center mt-8 lg:flex-row flex-col">
      {steps?.map((step, i) => (
        <div key={`${step}-${i}`} className="step-item">
          <div className="step">{i + 1}</div>
          <Link href={`${step.link}`} passHref className="z-10">
            <motion.button
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              onClick={simulateLoading}
              className={cn(
                "text-white bg-gradient-to-r rounded-sm font-poppins cursor-pointer from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium lg:text-lg text-sm lg:px-6 lg:py-4 px-2 py-2 text-center lg:mb-2 mb-10",
                isAuth && step.name === "Signed"
                  ? "from-green-400 via-green-500 to-green-600 dark:shadow-green-800/80 shadow-green focus:ring-green-300 focus-visible:ring-green-800 shadow-green-500/50"
                  : "",
                hasProjects && step.name === "project created"
                  ? "from-green-400 via-green-500 to-green-600 dark:shadow-green-800/80 shadow-green focus:ring-green-300 focus-visible:ring-green-800 shadow-green-500/50"
                  : "",
                hasProjects && step.name === "Watch Progress"
                  ? "from-green-400 via-green-500 to-green-600 dark:shadow-green-800/80 shadow-green focus:ring-green-300 focus-visible:ring-green-800 shadow-green-500/50 hover:from-blue-400 hover:via-blue-500 hover:to-blue-600"
                  : ""
              )}

              style={{ boxShadow: "4px 4px 0px rgba(0,0,0,1)" }}
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  {step.icon} 
                </div>
                <div>{step.name}</div>
              </div>
            </motion.button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
