"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTransform, useScroll, motion } from "framer-motion";
import {  Facebook, Github, Linkedin, MoveRightIcon, Twitter } from "lucide-react";
import TypewriterComponent from "typewriter-effect";

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

const socialMediaData = [
    {
      name: "Facebook",
      icon:<Facebook />,
      link: "https://www.facebook.com/profile.php?id=100092313284360&sk=about",
    },
    {
      name: "Twitter",
      icon:<Twitter/>,
      link: "https://twitter.com/AbdullaCoding32",
    },
    {
      name: "LinkedIn",
      icon:<Linkedin/>,
      link: "https://www.linkedin.com/in/abdullahcoding32",
    },
    {
      name: "GitHub",
      icon:<Github/>,
      link: "https://github.com/AbdullahZafar327?tab=repositories",
    },
  ];

  const y = useTransform(scrollYProgress, [0, 1], [1, 100]);
  const textY = useTransform(scrollYProgress, [0, 1], [1, 200]);
  const ProfileY = useTransform(scrollYProgress,[0,1],[0,1000])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const pathLength = useTransform(scrollYProgress,[0,0.5],[1,0])

  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById("portfolio-section");

    if (portfolioSection) {
      portfolioSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "end",
      });
    }
  };

  const ScrollToService = () => {
    const ServicesSection = document.getElementById("services-section");
    if (ServicesSection) {
      ServicesSection.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  };


  return (
    <div
      id="home-section"
      ref={containerRef}
      //@ts-ignore
      style={{ y }}
      className="relative bg-[#FBDE4B] p-10 w-full h-screen"
    >
      <div className="relative flex flex-col items-center justify-center">
        <motion.h1
          style={{ y: textY }}
          className="font-bold text-black text-3xl sm:text-6xl md:text-6xl"
        >
          HI <span>👋</span>&apos; I'M
        </motion.h1>
        <motion.h1
          style={{ y: textY }}
          className="font-bold text-[#D32E34] text-[60px] md:text-[120px] font-poppins"
        >
          ABDULLAH
        </motion.h1>
        <div className="bg-clip-text text-transparent bg-gradient-to-tr from-black to-pink-600 font-semibold text-xl md:text-3xl font-playfairDisplay">
          <TypewriterComponent
            options={{
              strings: ["Software Developer & Designer","3D Applications","UX and UI Designs","Fully functional SAAS","Ecommerce"],
              autoStart:true,
              loop:true,
              deleteSpeed:0.3,
              delay:0.3,
            }}
          />
        </div>
      </div>

      <div className="absolute xl:top-1/3 xl:right-[30%] xl:rotate-0 rotate-45 top-80 right-1/4 z-10">
        <svg
          width="116"
          height="173"
          viewBox="0 0 116 173"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="xl:flex hidden"
        >
          <motion.path
            d="M101.471 2.59189C112.455 25.5829 116.124 52.1096 113.176 77.4682C110.682 98.9104 97.9577 115.14 84.4299 131C65.719 152.937 31.9262 171.451 2.32422 171.451"
            stroke="black"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
            style={{pathLength,opacity}}
          />
          <motion.path
            d="M99.3837 2.77097C99.3837 5.2204 99.4499 7.68045 99.3837 10.1293C99.3261 12.2617 98.0364 14.1488 97.6799 16.2283C97.6022 16.682 97.6059 20.2314 97.6059 18.3271"
            stroke="black"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
            style={{pathLength,opacity}}
          />
          <motion.path
            d="M99.8281 2.77096C101.853 1.15074 105.303 4.731 106.742 5.88219C108.934 7.63595 111.468 9.66414 114.051 10.7713"
            stroke="black"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
            style={{pathLength,opacity}}
          />
        </svg>
      </div>
      <div className="absolute top-1/2 left-1/4 rotate-45 z-10">
      <svg
          width="116"
          height="173"
          viewBox="0 0 116 173"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="xl:flex hidden"
        >
          <motion.path
            d="M101.471 2.59189C112.455 25.5829 116.124 52.1096 113.176 77.4682C110.682 98.9104 97.9577 115.14 84.4299 131C65.719 152.937 31.9262 171.451 2.32422 171.451"
            stroke="black"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
            style={{pathLength,opacity}}
          />
          <motion.path
            d="M99.3837 2.77097C99.3837 5.2204 99.4499 7.68045 99.3837 10.1293C99.3261 12.2617 98.0364 14.1488 97.6799 16.2283C97.6022 16.682 97.6059 20.2314 97.6059 18.3271"
            stroke="black"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
            style={{pathLength,opacity}}
          />
          <motion.path
            d="M99.8281 2.77096C101.853 1.15074 105.303 4.731 106.742 5.88219C108.934 7.63595 111.468 9.66414 114.051 10.7713"
            stroke="black"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
            style={{pathLength,opacity}}
          />
        </svg>
      </div>
      <div className="xl:absolute flex items-center justify-between gap-4 xl:top-1/2 xl:left-1/3 z-10">
          <motion.button
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{y:textY,opacity}}
            type="button"
            onClick={scrollToPortfolio}
            className="flex items-center justify-between text-white gap-3 md:text-xl bg-gradient-to-r from-red-400 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg lg:px-10 lg:py-4 py-3 px-2 md:px-6 md:py-4 text-[14px] text-center"
          >
            Portfolio{" "}
            <MoveRightIcon/>
          </motion.button>
     
        <motion.button
          onClick={ScrollToService}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          type="button"
          style={{ y: textY,opacity }} 
          className="text-white xl:hidden flex mt-2  bg-gradient-to-r  font-poppins  cursor-pointer from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg md:text-xl sm:text-lg  lg:px-8 lg:py-4 md:px-6 md:py-4 px-3 py-3 text-center me-2 mb-2"
        >
          Hire Me
        </motion.button>
      </div>
     
      <motion.div className="relative flex items-center justify-center pt-20" style={{opacity,y:ProfileY}}>
        <motion.div
          className="relative h-[500px] w-[500px] sm:[600px] sm:[600px]  md:h-[800px] md:w-[800px] rounded-full bg-[#D32E34] flex items-center justify-center mt-0 xl:mt-20"
        >
          <Image src="/abdullah.png" alt="profile" width={400} height={400}  />
          <motion.button
          className="absolute px-10 py-4 bottom-0 md:flex items-center justify-center font-bold text-[24px] border-4 hover:bg-pink-500 border-black bg-[#65E4A3] shadow-2xl shadow-black hidden "
          initial={{y:100,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.5}}
          style={{ boxShadow: "8px 8px 0px rgba(0,0,0,1)" }}
        >
          Sign up to get started
        </motion.button>
        </motion.div>
      </motion.div>
      <motion.div
        style={{ y: textY }}
        className="absolute bottom-20 xl:left-20 left-10  flex flex-col items-center gap-3 "
      >
        {socialMediaData?.map((data, i) => (
          <Link href={`${data.link}`} key={`${data.name}-${i}`} target="_blank" className="h-30 w-30 md:h-50 md:w-50">
            {data.icon}
          </Link>
        ))}
      </motion.div>
     <motion.div>
      <motion.button
          onClick={ScrollToService}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          type="button"
          style={{ y: textY }} 
          className="text-white xl:absolute xl:flex xl:top-80 xl:right-1/4 mt-2 hidden  bg-gradient-to-r  font-poppins  cursor-pointer from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg md:text-xl sm:text-lg  lg:px-8 lg:py-4 md:px-6 md:py-4 px-3 py-3 text-center me-2 mb-2"
        >
          Hire Me
        </motion.button>
     </motion.div>
    </div>
  );
};

export default Hero;
