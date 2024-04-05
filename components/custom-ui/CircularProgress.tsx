"use client"
import React, { useEffect, useState } from "react";
import "./progressbar.css";
import {easeIn, motion} from 'framer-motion'

interface circularProps{
value:number,
name:string
}
const CircularProgress = ({value,name}:circularProps) => {
    const [currentValue, setCurrentValue] = useState(0);
    const strokeDashOffset = 472 - (472 * value) / 100;


    useEffect(() => {
        const incrementAnimation = setInterval(() => {
          if (currentValue < value) {
            setCurrentValue((prevValue) => prevValue + 1);
          }
        }, 10); // Adjust the interval as needed for smoother animation
    
        return () => clearInterval(incrementAnimation);
      }, [value, currentValue]);

  return (
    <div className="flex flex-col items-center gap-10">

    <p className="text-center "><code>{name}</code></p>
    <div className="CircularProgress">
      <div className="relative circular-outer">
        <div className="circular-inner">
          <motion.div className="font-bold">{currentValue}%</motion.div>
        </div>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="160px"
          height="160px"
          className="absolute top-0 right-0"
          
        >
          <defs>
            <linearGradient id="GradientColor">
              <stop offset="0%" stopColor="#8a2be2" />
              <stop offset="50%" stopColor="#ba55d3" />
              <stop offset="100%" stopColor="#7b68ee" />
            </linearGradient>
          </defs>
          <motion.circle
            cx="80"
            cy="80"
            r="70"
            strokeLinecap="round"
            strokeWidth={20}
            strokeDasharray={472}
            strokeDashoffset={200}
            initial={{
                strokeDashoffset:472
            }}
            animate={{
                strokeDashoffset:strokeDashOffset
              }}
              transition={{duration:1,ease:easeIn}}
          />
        </motion.svg>
      </div>
    </div>
    </div>
  );
};

export default CircularProgress;
