"use client";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import { Code, Smile } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import 'swiper/css'

interface cardProps {
  name:string,
  Description:string,
  sourceCode:string,
  thumbnail:StaticImageData
}

const Card = ({ name,Description,sourceCode,thumbnail }: cardProps) => {
  const [showOverlay, setShowOverlay] = useState(false);
  

  return (
    <motion.div
      onHoverStart={() => setShowOverlay(true)}
      onHoverEnd={() => setShowOverlay(false)}
      className="rounded-3xl shadow-3xl shadow-white border border-black flex items-center justify-center m-8"
    >
      <AnimatePresence>
        {showOverlay && (
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
            <div className="pointer-events-none bg-black/50 absolute w-[150px] h-[150px] rounded-full" />
            <motion.div
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              exit={{ y: 10 }}
              className="font-semibold bg-white hover:bg-green-400 flex items-center justify-center rounded-full  gap-2 w-[120px] h-[120px] text-sm p-4 cursor-pointer z-10 hover:text-white"
            >
              <a href={sourceCode} target="_blank">Github</a>
              <Code/>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Image src={thumbnail} fill alt="portfolio" style={{ objectFit: "cover" }} />
    </motion.div>
  );
};

export default Card;
