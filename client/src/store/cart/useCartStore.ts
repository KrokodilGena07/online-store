import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {IIdInput} from '@/models/IIdInput';
import {CartApi} from '@/API/CartApi';

interface CartStore {
    incrementCountOrAdd: (data: IIdInput) => Promise<void>;
    decrementCountOrRemove: (id: string) => Promise<void>;
    removeCartItem: (id: string) => Promise<void>;
}

export const useCartStore = create<CartStore>()(immer(set => ({
    incrementCountOrAdd: async (data: IIdInput) => {
        await CartApi.incrementCountOrAdd(data)
            .catch(err => {});
    },
    decrementCountOrRemove: async (id: string) => {
        await CartApi.decrementCountOrRemove(id)
            .catch(err => {});
    },
    removeCartItem: async (id: string) => {
        await CartApi.removeCartItem(id)
            .catch(err => {})
    }
})));