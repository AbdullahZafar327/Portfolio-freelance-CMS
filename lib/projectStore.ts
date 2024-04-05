import { IOrder, IProject, IUser } from './mongodb';
import { Order_Project_User, ProjectWithUser } from '@/type';
import axios from 'axios';
import {create} from 'zustand'


interface ProjectsState {
  projects: IProject[];
  allProjects: ProjectWithUser[];
  allOrders:Order_Project_User[];
  isUploading: boolean;
  isPaymentToast:boolean;
  fetchProjects: () => Promise<void>;
  fetchAllOrders:()=>Promise<void>
  setShowToast:(toast:boolean)=>void;
  fetchAllProjects:()=>Promise<void>;
  setIsUploading: (uploading: boolean) => void;
}


const useProjectsStore = create<ProjectsState>((set) => ({
  projects: [],
  allProjects: [],
  allOrders:[],
  isUploading: false,
  isPaymentToast:false,
  fetchProjects: async () => {
    try {
      const response = await axios.get('/api/getProjects');
      const projects = await response.data;
      set({ projects });
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  },
  fetchAllProjects:async() =>{
    const response = await fetch('/api/allprojects/get')
    const allProjects = await response.json()
      set({allProjects:allProjects})
  },
  fetchAllOrders:async()=>{
try {
  const response = await axios.get("/api/allOrders/get")
  const allOrders = await response.data
  set({allOrders})
} catch (error) {
  console.log(error)
}
  },
  setIsUploading: (uploading) => set({ isUploading: uploading }),
  setShowToast:(toast)=>set({isPaymentToast:toast})
}));

export default useProjectsStore;
