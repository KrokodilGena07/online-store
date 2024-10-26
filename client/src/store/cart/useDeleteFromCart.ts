import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {CartApi} from '@/API/CartApi';

interface RemoveFromCartStore {
    remove: (id: string) => Promise<void>;
}

export const useDeleteFromCart = create<RemoveFromCartStore>()(immer(set => ({
    remove: async (id: string) => {
        await CartApi.delete(id);
    }
})));