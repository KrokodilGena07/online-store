import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {ProductsApi} from '@/API/ProductsApi';
import {IProductQuery} from '@/models/product/IProductQuery';
import {IProductsResponse} from '@/models/responses/IProductsResponse';

interface FetchProductsStore {
    data: IProductsResponse;
    isLoading: boolean;
    fetchProducts: (data: IProductQuery) => void;
}

export const useFetchProducts = create<FetchProductsStore>()(immer((set, get) => ({
    data: null,
    error: null,
    isLoading: false,
    fetchProducts: async (query: IProductQuery) => {
        set({isLoading: true});
        try {
            const data = await ProductsApi.fetchProducts(query);
            set({isLoading: false, data});
        } catch (e) {
            set({isLoading: false});
        }
    }
})));