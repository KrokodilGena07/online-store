import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {ICartItem} from '@/models/cart/ICartItem';
import {CartApi} from '@/API/CartApi';
import {IIdInput} from '@/models/IIdInput';

interface FetchCartItemStore {
    data: ICartItem | null;
    isLoading: boolean;
    fetchCartItem: (data: IIdInput) => void;
}

export const useFetchCartItem = create<FetchCartItemStore>()(immer(set => ({
    data: null,
    isLoading: false,
    fetchCartItem: async (data: IIdInput) => {
        set({isLoading: true, data: null});
        try {
            const rating = await CartApi.fetchCartItem(data);
            set({isLoading: false, data: rating});
        } catch (e) {
            set({isLoading: false});
        }
    }
})));