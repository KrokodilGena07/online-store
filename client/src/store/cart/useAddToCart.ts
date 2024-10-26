import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {CartApi} from '@/API/CartApi';
import {ICartItemInput} from '@/models/cart/ICartItemInput';

interface AddToCartStore {
    addToCart: (cartInput: ICartItemInput) => Promise<void>;
}

export const useAddToCart = create<AddToCartStore>()(immer(set => ({
    addToCart: async (cartInput: ICartItemInput) => {
        await CartApi.incrementCountOrAdd(cartInput)
    }
})));