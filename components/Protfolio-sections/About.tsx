"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import CircularProgress from "../custom-ui/CircularProgress";

const About = () => {
  const AboutContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: AboutContainerRef,
    offset: ["start end", "end start"],
  });

  const [imageSize, setImageSize] = useState({ width: 400, height: 400 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setImageSize({ width: 300, height: 300 });
      } else {
        setImageSize({ width: 400, height: 400 });
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const aboutY = useTransform(scrollYProgress, [0, 0.5], [-50, 10]);
  const BlobY = useTransform(scrollYProgress, [0, 0.5], [200, 0]);

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const data = [
    { value: "JavaScript", count: 18 },
    { value: "React", count: 145 },
    { value: "MongoDb", count: 233 },
  ];
  const data2 = [
    { value: "Html", count: 78 },
    { value: "Nextjs", count: 365 },
    { value: "Ux", count: 83 },
    { value: "UI", count: 255 },
    { value: "CSS", count: 33 },
    { value: "3D", count: 15 },
    { value: "parralax", count: 67 },
  ];

  const data3 = [
    { value: "Tailwind", count: 73 },

    { value: "web Development", count: 65 },
    { value: "System Design", count: 92 },
    { value: "Threejs", count: 19 },
    { value: "Material UI", count: 8 },
  ];
  const data4 = [
    { value: "Nodejs", count: 39 },
    { value: "express", count: 46 },
    { value: "Docker", count: 50 },
    { value: "kubernetes", count: 90 },
    { value: "software ", count: 67 },
  ];

  const data5 = [
    { value: "SAAS", count: 189 },
    { value: "3D", count: 15 },
    { value: "parralax", count: 67 },
    { value: "Ecommerce", count: 49 },
    { value: "Web design", count: 111 },
  ];

  return (
    <div
      id="about-section"
      ref={AboutContainerRef}
      className="relative bg-[#ECEFFF] w-full xl:p-4 p-0 h-max overflow-hidden"
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
          className="font-bold text-white lg:text-[50px] text-3xl bg-black font-bodoniModa lg:py-4 lg:px-4 py-2 px-2 relative"
        >
          ABOUT
        </motion.h1>
      </div>
      <div className="grid xl:grid-cols-3  grid-cols-1 w-full h-full p-4">
        <div className="col-span-1 h-full w-full">
          <div className="flex flex-col items-center">
            <motion.h1 className="flex items-center lg:text-6xl text-3xl font-bold font-poppins justify-between gap-2"
            animate={{opacity:0,y:100}}
            whileInView={{opacity:1,y:0}}
            transition={{duration:0.3,ease:"easeIn"}}
            >
              Hi&nbsp;
              <Image src="/bear.png" alt="hi there" width={30} height={30} />
              I'm Abdullah
            </motion.h1>
            <motion.div
              style={{
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(10px)",
              }}

              animate={{opacity:0,y:100}}
            whileInView={{opacity:1,y:0}}
            transition={{duration:0.3,ease:"easeIn"}}
              className="bg-white bg-opacity-40 p-4 rounded-xl"
            >
              {" "}
              <p className="text-lg font-karla">
                I build 3D Visuals ,UX UI Designs and Full stack Web applications.
              </p>
            </motion.div>
            <motion.div className="xl:h-[800px] xl:w-[800px] md:h-[600px] md:w-[600px] h-[500px] w-[500px] animate-blob bg-gradient-tr from-violet-500 to bg-purple-700 mt-8 flex items-center justify-center"
            style={{
              y:BlobY
            }}
            >
              <motion.div
              animate={{opacity:0,y:100}}
              whileInView={{opacity:1,y:0}}
              transition={{duration:0.3,ease:"easeIn"}}
              >
              <Image
                src="/profile2.png"
                height={imageSize.height}
                width={imageSize.width}
                alt="profile2"
                className="z-10 mt-8"
              />
              </motion.div>
             
            </motion.div>
          </div>
        </div>
        <div className="col-span-1 h-full w-full items-center justify-center p-8 relative lg:mt-12 mt-0">
          <div
            style={{
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(10px)",
            }}
            className="flex items-center xl:mt-32 mt-16 bg-violet-500/60 bg-opacity-40 p-8 rounded-xl lg:h-[300px]"
          >
            {" "}
            <p className="lg:text-xl text-lg font-karla text-center">
              My goal is to empower entrepreneurs through innovative online
              solutions. From crafting complex applications to designing
              captivating user interfaces, I leverage a unique blend of skills
              to make every website exceptional. With expertise in 3D effects,
              parallax scrolling, and functional design, I ensure that each
              project is both visually stunning and highly functional.
            </p>
          </div>
        </div>
        <div className="col-span-1 h-full w-full flex flex-col items-center p-4">
          <div>
            <code>
              <h1 className="font-semibold text-3xl tracking-widest">
                My Experience
              </h1>
            </code>
          </div>
          <div className="flex md:flex-row flex-col items-center gap-10 mt-8">
            <CircularProgress value={86} name="Full stack development" />
            <CircularProgress value={84} name="Web Development" />
            <CircularProgress value={67} name="Web Design" />
            <CircularProgress value={73} name="Social Skills" />
          </div>
          <code>
            <h1 className="font-semibold text-3xl tracking-widest">Others</h1>
          </code>
          <div className="flex md:flex-row flex-col items-center gap-10 mt-8">
            <CircularProgress value={71} name="Video editing" />
            <CircularProgress value={58} name="Copywriting" />
            <CircularProgress value={50} name="Animation" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
