"use client"
import React, { useEffect, useState } from 'react';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';

const ShowToast = () => {
  const [loadingToastShown, setLoadingToastShown] = useState(false);
 
  const { toast } = useToast();
  const router = useRouter()
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingToastShown(true);
    }, 3000); 
    router.refresh()
    return () => clearTimeout(timer); 
  }, []);

  useEffect(() => {
    if (!loadingToastShown) {

      toast({
        description: (
          <div className="flex items-center justify-between">
            <span>Fetching Projects. Please wait...</span>
            <img src="/arrows.png" alt="loading" width={20} height={20} className="animate-spin" />
          </div>
        ),
      });
    } else {
    }
  }, [loadingToastShown, toast]);

  return <div></div>;
};

export default ShowToast;
