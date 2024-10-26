import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {CartApi} from '@/API/CartApi';

interface RemoveFromCartStore {
    removeFromCart: (id: string) => Promise<void>;
}

export const useRemoveFromCart = create<RemoveFromCartStore>()(immer(set => ({
    removeFromCart: async (id) => {
        await CartApi.update(id);
    }
})));