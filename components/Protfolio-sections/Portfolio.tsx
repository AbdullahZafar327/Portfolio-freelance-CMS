"use client";
import React, { useRef } from "react";

import Card from "../portfolio-cards/card";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "./index.css";
import { Projects } from "@/dummy";
import {motion, useScroll, useTransform} from 'framer-motion'
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

const Portfolio = () => {
  const containerRef = useRef(null)

  const {scrollYProgress} = useScroll({
     target:containerRef,
     offset:['start end','end start']
  })

  const scrollY = useTransform(scrollYProgress,[0,0.5],[400,-100])
  const opacity = useTransform(scrollYProgress, [0,0.5], [0,1]);
  const textY = useTransform(scrollYProgress,[0,0.6],[-150,20])
  

  return (
    <motion.div
      id="portfolio-section"
      className="bg-[#FBDE4B] flex flex-col w-full p-8 h-screen"
      ref={containerRef}
    >
      <div className="md:p-4 md:m-4 p-0 m-0 flex flex-row gap-4">
        <div className="flex flex-col">
          <motion.h1
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="font-bold text-black lg:text-6xl text-[50px] font-playfairDisplay"
            style={{y:textY,opacity}}
          >
            Lets have a look at
          </motion.h1>
          <motion.h1
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="mt-2 font-bold text-rose-600 lg:text-6xl text-[50px] font-playfairDisplay"
            style={{y:textY,opacity}}
          >
            <span className="text-black">My </span> portfolio
          </motion.h1>
        </div>
        <motion.div className="lg:p-8 p-2 mt-8" style={{y:textY,opacity}}>
          <svg
            className="lg:h-56 lg:w-44 h-36 w-28"
            viewBox="0 0 174 226"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M172.476 213.197C171.167 215.934 170.787 218.863 169.838 221.71C169.684 222.174 169.29 224.099 168.481 224.018C166.085 223.778 164.293 220.067 163.051 218.433"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.path
              d="M1.91974 2.21326C26.4918 10.3168 48.8366 22.962 69.4998 38.5936C100.301 61.8944 121.912 90.9477 138.634 125.458C153.621 156.386 163.384 190.031 168.74 223.949"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 }}
            />
          </svg>
        </motion.div>
      </div>
      <motion.div className="container flex items-center" style={{y:scrollY,opacity}} >
        <Swiper
          effect={"coverflow"}
          modules={[EffectCoverflow, Pagination, Navigation]}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          loop={true}
          centeredSlides={true}
          grabCursor={true}
          slidesPerView={"auto"}
          pagination={true}
          navigation={true}
          className="swiper_container flex items-center pt-0 mt-0"
        >
          {Projects.map((project, index) => (
            <>
              <motion.div key={index}>
                <SwiperSlide className="swiper-slide pt-0 mt-0" key={index}>
                  <Card
                    name={project?.name}
                    Description={project.Description}
                    sourceCode={project.sourceCode}
                    thumbnail={project.thumbnail}
                  />
                </SwiperSlide>
              </motion.div>
            </>
          ))}
        </Swiper>
      </motion.div>
    </motion.div>
  );
};

export default Portfolio;
