import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {CartApi} from '@/API/CartApi';
import {ProductsApi} from '@/API/ProductsApi';
import {ICartProduct} from '@/models/ICartProduct';

interface FetchListStore {
    isLoading: boolean;
    data: ICartProduct[];
    fetchList: (id: string) => void;
}

export const useFetchList = create<FetchListStore>()(immer(set => ({
    isLoading: false,
    data: null,
    fetchList: async (id: string) => {
        set({isLoading: true});
        try {
            await CartApi.fetchCartItems(id).then(async list => {
                const ids = list.map(item => item.productId);
                const products = await ProductsApi.fetchProductsByIds(ids);
                const data = products.map(
                    (product, index) => ({
                            ...product,
                            count: list[index].count,
                            cartId: list[index].id
                    }
                ));
                set({isLoading: false, data});
            });
        } catch (e) {
            set({isLoading: false});
        }
    }
})));