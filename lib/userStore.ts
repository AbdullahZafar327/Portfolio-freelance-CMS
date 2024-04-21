import { create } from 'zustand';
import { IUser } from './mongodb';

interface UserStoreProps {
    user: IUser,
    fetchUser: () => Promise<void>
}

export const useUserStore = create<UserStoreProps>((set) => ({
    user: {} as IUser,
    fetchUser: async () => {
        try {
            const response = await fetch('/api/getUser/get');
            const user = await response.json();
            set({ user });
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }
}));
