import React from 'react'
import './progressbar.css'
import {motion} from 'framer-motion'

interface lineProgressProps {
  value:number;
  name:string
}
const LineProgress = ({name,value}:lineProgressProps) => {
  
    return (
      <div className='p-4 flex items-center justify-between gap-4 font-poppins'>
        <h4 className="font-semibold text-lg"><code>{name}</code></h4>
        <div className="progressbar">
            <motion.div className='bar' whileInView={{width:`${value}%`}}  transition={{duration:1,delay:0.2,ease:'easeInOut'}}/>
        </div>
        <p className='font-light'>{value}%</p>
      </div>
    );
  };
export default LineProgress
  