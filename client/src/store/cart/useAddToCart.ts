import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {CartApi} from '@/API/CartApi';
import {IIdInput} from '@/models/IIdInput';

interface AddToCartStore {
    addToCart: (cartInput: IIdInput) => Promise<void>;
}

export const useAddToCart = create<AddToCartStore>()(immer(set => ({
    addToCart: async (cartInput: IIdInput) => {
        await CartApi.incrementCountOrAdd(cartInput)
    }
})));