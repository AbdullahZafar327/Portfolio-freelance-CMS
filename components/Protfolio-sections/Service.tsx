"use client";
import { MyServices } from "@/dummy";
import React, { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowBigRight } from "lucide-react";
import { Tilt } from "react-tilt";
import Stepper from "./stepper/Stepper";
import Link from "next/link";

const Service = () => {
  const [showOverlay, setShowOverlay] = useState(
    Array(MyServices.length).fill(false)
  );
  const containerRef = useRef(null);

  const defaultOptions = {
    reverse: false,
    max: 30,
    perspective: 1200,
    scale: 0.8,
    speed: 1000,
    transition: true,
    axis: null,
    reset: true,
    easing: "cubic-bezier(.03,.98,.52,.99)",
  };

  const handleHoverStart = (idx: number) => {
    const updatedOverlayState = [...showOverlay];
    updatedOverlayState[idx] = true;
    setShowOverlay(updatedOverlayState);
  };

  const handleHoverEnd = (idx: number) => {
    const updatedOverlayState = [...showOverlay];
    updatedOverlayState[idx] = false;
    setShowOverlay(updatedOverlayState);
  };
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const serviceY = useTransform(scrollYProgress, [0, 0.5], [-100, 10]);
  const goUp = useTransform(scrollYProgress, [0, 0.5], [400, -10]);

  return (
    <div
      id="services-section"
      className="relative flex flex-col w-full xl:p-8 p-4 max-h-max bg-[#FBDE4B]"
      ref={containerRef}
    >
      <div className="flex flex-col items-center justify-center gap-3 pt-4">
        <motion.h1
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          style={{
            opacity,
            y: serviceY,
          }}
          className="font-bold text-white text-6xl bg-black font-bodoniModa p-4 relative"
        >
          Services
        </motion.h1>
      </div>
      <div className="relative container xl:mt-16 mt-0">
        <motion.div
          className="relative grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-2 items-center justify-center"
          style={{ y: goUp, opacity }}
        >
          {MyServices?.map((service, idx) => (
            <div className="grid-span-1 flex items-center justify-center" key={idx}>
              <Tilt options={defaultOptions} key={`${service}-${idx}`}>
                <motion.div
                  onHoverStart={() => handleHoverStart(idx)}
                  onHoverEnd={() => handleHoverEnd(idx)}
                  key={`${service}-${idx}`}
                  className="relative border-2 border-black rounded-3xl  h-[700px] w-[500px] overflow-hidden"
                >
                  <div className="absolute top-12 w-full h-[2px] bg-white" />
                  <video
                    src={service.videoLink}
                    autoPlay
                    loop
                    playsInline
                    muted
                    className="h-full w-full relative object-cover rounded-3xl"
                  >
                    {showOverlay[idx] && (
                  <div className="absolute bottom-0 flex inset-0 bg-white rounded-b-3xl">
                    <motion.p className=" text-black p-4">
                      {service.description}
                    </motion.p>
                  </div>
                )}
                  </video>
                  <AnimatePresence>
                    {showOverlay[idx] && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-10 flex items-center justify-center"
                        style={{
                          transform: "translateZ(75px)",
                          transformStyle: "preserve-3d",
                        }}
                      >
                        <div className="pointer-events-none bg-black/20 absolute w-full h-full rounded-3xl" />
                        <div className="flex flex-col items-center">
                        <motion.h1
                          initial={{ y: 10 }}
                          animate={{ y: 0 }}
                          exit={{ y: 10 }}
                          className="font-semibold text-white flex rounded-full items-center gap-2 px-6 py-4 text-3xl cursor-pointer z-10"
                        >
                          {service.name}
                        </motion.h1>
                        <motion.h1
                          initial={{ y: 10 }}
                          animate={{ y: 0 }}
                          exit={{ y: 10 }}
                          className="font-semibold bg-white hover:bg-green-400 flex rounded-full items-center gap-2 px-6 py-4 text-lg cursor-pointer z-10"
                        >
                          <Link href="/createProject">Buy Now</Link>
                          <ArrowBigRight />
                        </motion.h1>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Tilt>
            </div>
          ))}
        </motion.div>
      </div>
      <div className="flex items-center justify-center p-8">
        <h1 className="font-bold text-black text-6xl text-center">
          How It <span className="text-rose-500">Works?</span>
        </h1>
      </div>
      <Stepper />
    </div>
  );
};

export default Service;
