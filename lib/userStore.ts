import {create} from 'zustand';
import { IUser } from './mongodb';
import axios from 'axios';
interface UserStoreprops {
    user:IUser,
    fetchUser:()=>Promise<void>
}
export const useUserStore = create<UserStoreprops>((set)=>({
  user:{} as IUser,
  fetchUser:async()=>{
    try {
        const response = await fetch('/api/getUser/get')
        const user = await response.json()
        set({user})
    } catch (error) {
        
    }
  }
}))