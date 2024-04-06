"use client"
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import useProjectsStore from '@/lib/projectStore';
import './loading.css'
const LoadingOverlay = () => {
  const { isLoading } = useProjectsStore()
  const controls = useAnimation();

  useEffect(() => {
    if (isLoading) {
      controls.start({ opacity: 1 });
    } else {
      controls.start({ opacity: 0 });
    }
  }, [isLoading, controls]);

  return (
    <>
    {isLoading && (
        <motion.div
        className="loading-overlay"
        style={{ opacity: 0 }}
        animate={controls}
        transition={{ duration: 0.3 }}
      >
        <div className="spinner"></div>
      </motion.div>
    )}
   </>
  );
};

export default LoadingOverlay;
