"use client";
import React, { useRef } from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import PieChart from "./pie";
import { useScroll, useTransform, motion } from "framer-motion";
import Blob from "./Blob";
import  SimpleCloud  from "./TagSphere";
import CircularProgress from "./CircularProgress";

const About = () => {
  const AboutContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: AboutContainerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 0.5], [-300, 10]);
  const y = useTransform(scrollYProgress, [0, 0.5], [1000, -10]);
  const aboutY = useTransform(scrollYProgress, [0, 0.5], [-50, 10]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const LowerScaling = useTransform(scrollYProgress, [0, 1], [2, 0]);
  const pieChartY = useTransform(scrollYProgress, [0, 1], [300, -100]);
  const pieChartX = useTransform(scrollYProgress, [0, 0.5], [600, -300]);

  const data = [
    { value: 'JavaScript', count: 18 },
    { value: 'React', count: 145 },
    { value: 'MongoDb', count: 233 },
  ];
  const data2 = [
    { value: 'Html', count: 78 },
    { value: 'Nextjs', count: 365 },
    { value: 'Ux', count: 83 },
    { value: 'UI', count: 255 },
    { value: 'CSS', count: 33 },
        { value: '3D', count: 15 },
    { value: 'parralax', count: 67 },
  ];

  const data3=[
    { value: 'Tailwind', count: 73 },

    { value: 'web Development', count: 65 },
    { value: 'System Design', count: 92 },
    { value: 'Threejs', count: 19 },
    { value: 'Material UI', count: 8 },
  ]
  const data4=[
    { value: 'Nodejs', count: 39 },
    { value: 'express', count: 46 },
    { value: 'Docker', count: 50 },
    { value: 'kubernetes', count: 90 },
    { value: 'software ', count: 67 },
  ]

  const data5=[
    { value: 'SAAS', count:189 },
    { value: '3D', count: 15 },
    { value: 'parralax', count: 67 },
    { value: 'Ecommerce', count: 49 },
    {value:'Web design',count:111}
  ]

  return (
    <div
      id="about-section"
      ref={AboutContainerRef}
      className="relative bg-[#ECEFFF] w-full p-4 h-max overflow-hidden"
    >
       <div className="flex flex-col items-center justify-center gap-3 pt-4">
        <motion.h1
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          style={{
            opacity,
            y: aboutY,
          }}
          className="font-bold text-white text-[50px] bg-black font-bodoniModa py-0 px-4 relative"
        >
          ABOUT
        </motion.h1>
      </div>
      <div className="grid xl:grid-cols-3  grid-cols-1 w-full h-full p-4">
         <div className="grid-span-1 h-full w-full">
           <div className="flex flex-col items-center">
             <h1 className="flex items-center text-6xl font-bold font-poppins justify-between gap-2">HI&nbsp;<Image src="/bear.png" alt="hi there" width={50} height={50}/>,Meet Abdullah</h1>
             <div style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', backdropFilter: 'blur(10px)' }} className="bg-white bg-opacity-40 p-4 rounded-xl"> <p className="text-lg font-karla">Who build 3D Visuals ,UX UI Designs and Web applications</p></div>
             <div className="xl:h-[800px] xl:w-[800px] h-[600px] w-[600px] animate-blob bg-gradient-tr from-violet-500 to bg-purple-700 mt-8 flex items-center justify-center">
                <Image src="/profile2.png" height={400} width={400} alt="profile2" className="z-10 mt-8" />
             </div>
           </div>
         </div>
         <div className="grid-span-1 h-full w-full items-center justify-center p-4 relative">
         <div style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', backdropFilter: 'blur(10px)' }} className="flex items-center mt-32 bg-violet-500/60 bg-opacity-40 p-4 rounded-xl"> <p className="text-lg font-karla">My goal is to empower entrepreneurs through innovative online solutions. From crafting complex applications to designing captivating user interfaces, I leverage a unique blend of skills to make every website exceptional. With expertise in 3D effects, parallax scrolling, and functional design, I ensure that each project is both visually stunning and highly functional.</p></div>
         </div>
         <div className="grid-span-1 h-full w-full flex flex-col items-center p-4">
          <div>
          <code><h1 className="font-semibold text-3xl tracking-widest">My Experience</h1></code>
          </div>
          <div className="flex md:flex-row flex-col items-center gap-10 mt-8">
          <CircularProgress value={86} name="Full stack development"/>
          <CircularProgress value={84} name="Web Development"/>
          <CircularProgress value={67} name="Web Design"/>
          <CircularProgress value={73} name="Social Skills"/>
          </div>
          <code><h1 className="font-semibold text-3xl tracking-widest">Others</h1></code>
          <div className="flex md:flex-row flex-col items-center gap-10 mt-8">
          <CircularProgress value={71} name="Video editing"/>
          <CircularProgress value={58} name="Copywriting"/>
          <CircularProgress value={50} name="Animation"/>
          </div>
         </div>
      </div>
    </div>
  );
};

export default About;
