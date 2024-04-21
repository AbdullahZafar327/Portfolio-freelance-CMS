import React from "react";
import "./progressbar.css";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";

interface lineProgressProps {
  value: number;
  name: string;
  imageSrc:string
}
const LineProgress = ({ name, value ,imageSrc}: lineProgressProps) => {
  return (
    <>
      <div className="flex justify-between w-full">
        <div className="flex justify-start items-center gap-2 mr-4">
          <Image src={imageSrc} alt="icon" height={20} width={20}/>
          <h4 className="font-semibold lg:text-lg text-xs">
            <code>{name}</code>
          </h4>
        </div>
        <div className="lg:p-4 flex justify-between gap-8 font-poppins">
          <div className="flex items-center justify-start gap-4 p-3">
            <div className="progressbar">
              <motion.div
                className="bar"
                whileInView={{ width: `${value}%` }}
                transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
              />
            </div>
            <div className="flex items-center justify-start">
              <p className="font-light">{value}%</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LineProgress;
