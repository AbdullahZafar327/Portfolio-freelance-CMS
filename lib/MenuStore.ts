import {create} from 'zustand';

interface MenuState {
    isOpen: boolean;
    toggleMenu: () => void;
    activeMenuItemId: string | null;
    setActiveMenuItemId: (itemId: string | null) => void;
}

const useMenuStore = create<MenuState>((set) => ({
    isOpen: false,
    toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
    activeMenuItemId: null,
    setActiveMenuItemId: (itemId) => set({ activeMenuItemId: itemId }),
}));

export default useMenuStore;