import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {AxiosError} from 'axios';
import {IErrorData} from '@/models/error/IErrorData';
import {ProductsApi} from '@/API/ProductsApi';
import {IProductQuery} from '@/models/product/IProductQuery';
import {IProductsResponse} from '@/models/IProductsResponse';

interface FetchProductsStore {
    data: IProductsResponse;
    error?: AxiosError<IErrorData>;
    isLoading: boolean;
    fetchProducts: (query: IProductQuery) => void;
}

export const useFetchProducts = create<FetchProductsStore>()(immer(set => ({
    data: null,
    error: null,
    isLoading: false,
    fetchProducts: async (query: IProductQuery) => {
        set({isLoading: true});
        try {
            const data = await ProductsApi.fetchProducts(query);
            set({isLoading: false, data});
        } catch (e) {
            set({isLoading: false, error: e});
        }
    }
})));