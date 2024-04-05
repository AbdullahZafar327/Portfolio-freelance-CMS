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
              className="mt-2 font-bold text-rose-600 lg:text-6xl text-[50px]"
              style={{ y: textY }}
            >
              Ninja <span className="text-black">At</span>
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
        <div className="grid xl:grid-cols-3  grid-cols-1 items-center justify-between gap-20 ">
          {/* //First colum1 */}
          <div className="flex flex-col items-center mt-4 p-4 col-span-1">
            <code className="text-xl font-bold flex justify-between gap-2 items-center">
              <span>Coding Tools</span>
              <Image src="/coding.png" alt="coding" height={30} width={30} />
            </code>
            <LineProgress value={92} name="React" />
            <LineProgress value={90} name="Nextjs" />
            <LineProgress value={80} name="Javascript" />
            <LineProgress value={76} name="Nodejs" />
            <LineProgress value={82} name="MongoDb" />
            <LineProgress value={70} name="Threejs" />
            <LineProgress value={88} name="Tailwindcss" />
            <LineProgress value={88} name="MaterialUI" />
            <LineProgress value={88} name="Tailwindcss" />
          </div>
          {/* //SECOND COLUM2 */}
          <div className="flex flex-col items-center mt-4 p-4 col-span-1">
            <code className="text-xl font-bold flex justify-between gap-2 items-center">
              <span>Design Tools</span>
              <Image src="/layers.png" alt="coding" height={30} width={30} />
            </code>
            <LineProgress value={92} name="React" />
            <LineProgress value={90} name="Nextjs" />
            <LineProgress value={80} name="Javascript" />
            <LineProgress value={76} name="Nodejs" />
            <LineProgress value={82} name="MongoDb" />
            <LineProgress value={70} name="Threejs" />
            <LineProgress value={88} name="Tailwindcss" />
            <LineProgress value={88} name="MaterialUI" />
            <LineProgress value={88} name="Tailwindcss" />
          </div>

          {/* //Ninja Column */}
          <motion.div
            className="col-span-1 w-full h-full"
            initial={{ x: 300 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 0.5, ease: easeInOut }}
          >
            <Image
              src="/ninja_1.gif"
              alt="ninja"
              width={30}
              height={30}
              unoptimized
              className="h-full w-full relative object-cover rounded-3xl"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Skills;
