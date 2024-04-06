import { create } from 'zustand';
import { IUser } from './mongodb';
import axios from 'axios';

interface UserStoreProps {
    user: IUser,
    fetchUser: () => Promise<void>
}

export const useUserStore = create<UserStoreProps>((set) => ({
    user: {} as IUser,
    fetchUser: async () => {
        try {
            const response = await axios.get('/api/getUser/get');
            const user = response.data;
            set({ user });
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }
}));
