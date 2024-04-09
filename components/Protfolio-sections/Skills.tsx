"use client";
import React, { useRef } from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "./index.css";

import { easeInOut, motion, useScroll, useTransform } from "framer-motion";
import LineProgress from "../custom-ui/LineProgress";
import Image from "next/image";

const Skills = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scrollY = useTransform(scrollYProgress, [0, 0.5], [200, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.6], [-50, 50]);

  return (
    <motion.div
      id="portfolio-section"
      className="bg-[#ECEFFF] flex items-start p-8 w-full max-h"
      ref={containerRef}
    >
      <div className="flex flex-col">
        <div className="md:p-4 md:m-4 p-0 m-0 flex flex-row gap-4">
          <div className="flex flex-col font-playfairDisplay">
            <motion.h1
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex items-center gap-4 mt-2 font-bold text-rose-600 lg:text-6xl text-[50px]"
              style={{ y: textY }}
            >
              Ninja <span className="text-black">At</span>  <Image src="/ninja.png" alt="ninja" height={100} width={80} className="items-center flex"/>
            </motion.h1>
            <motion.h1
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="font-bold text-black lg:text-6xl text-[50px]"
              style={{ y: textY }}
            >
              Technologies
            </motion.h1>
          </div>
        </div>
        <div className="grid xl:grid-cols-2 grid-cols-1 justify-start gap-20 container mx-0 px-0">
          {/* //First colum1 */}
          <div className="flex flex-col items-center lg:mt-4 mt-12 lg:p-4 p-0 pt-2 col-span-1 w-full">
            <code className="text-xl font-bold flex justify-between gap-2 items-center">
              <span>Coding Tools</span>
              <Image src="/coding.png" alt="coding" height={30} width={30} />
            </code>
            <LineProgress value={92} name="React"  imageSrc="/Technologies/structure.png"/>
            <LineProgress value={90} name="Nextjs" imageSrc="/Technologies/structure.png"/>
            <LineProgress value={80} name="Javascript" imageSrc="/Technologies/structure.png"/>
            <LineProgress value={76} name="Nodejs" imageSrc="/Technologies/structure.png"/>
            <LineProgress value={82} name="MongoDb" imageSrc="/Technologies/structure.png"/>
            <LineProgress value={70} name="Threejs" imageSrc="/Technologies/structure.png" />
            <LineProgress value={88} name="Express" imageSrc="/Technologies/structure.png"/>
            <LineProgress value={88} name="kubernetes" imageSrc="/Technologies/structure.png"/>
            <LineProgress value={88} name="docker" imageSrc="/Technologies/structure.png"/>
            <LineProgress value={88} name="Tailwindcss" imageSrc="/Technologies/structure.png"/>
            <LineProgress value={88} name="MaterialUI" imageSrc="/Technologies/structure.png"/>
            <LineProgress value={88} name="Tailwindcss" imageSrc="/Technologies/structure.png"/>
          </div>
          {/* //SECOND COLUM2 */}
          <div className="flex flex-col items-center lg:p-4 p-0 col-span-1 justify-start">
            <code className="text-xl font-bold flex gap-2 justify-center">
              <span>Design Tools</span>
              <Image src="/layers.png" alt="coding" height={30} width={30} />
            </code>
            <LineProgress value={92} name="Figma" imageSrc="/Technologies/structure.png"/>
            <LineProgress value={90} name="Illustrator" imageSrc="/Technologies/structure.png"/>
            <LineProgress value={80} name="photoShop" imageSrc="/Technologies/structure.png"/>
            <LineProgress value={76} name="Blender" imageSrc="/Technologies/structure.png"/>
            <LineProgress value={82} name="Spline" imageSrc="/Technologies/structure.png"/>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Skills;
