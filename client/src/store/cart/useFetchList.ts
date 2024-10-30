import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {CartApi} from '@/API/CartApi';
import {ProductsApi} from '@/API/ProductsApi';
import {ICartProduct} from '@/models/cart/ICartProduct';

interface FetchListStore {
    isLoading: boolean;
    data: ICartProduct[] | null;
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
                const data = [];
                for (let i = 0; i < ids.length; i++) {
                    for (let j = 0; j < ids.length; j++) {
                        if (products[i].id === list[j].productId) {
                            data.push({
                                ...products[i],
                                cartId: list[j].id,
                                count: list[j].count,
                            });
                            break
                        }
                    }
                }
                set({isLoading: false, data});
            });
        } catch (e) {
            set({isLoading: false});
        }
    }
})));