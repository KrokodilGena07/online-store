import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {IProduct} from '@/models/product/IProduct';
import {AxiosError} from 'axios';
import {IErrorData} from '@/models/error/IErrorData';
import {ProductsApi} from '@/API/ProductsApi';

interface FetchProductStore {
    data: IProduct | null;
    isLoading: boolean;
    error: string | null;
    fetchProduct: (id: string) => void;
}

export const useFetchProduct = create<FetchProductStore>()(immer(set => ({
    data: null,
    isLoading: false,
    error: null,
    fetchProduct: async (id: string) => {
        set({isLoading: true, error: null});
        try {
            const data = await ProductsApi.fetchProduct(id);
            set({isLoading: false, data});
        } catch (e) {
            const errorData = (e as AxiosError).response.data;
            set({isLoading: false, error: (errorData as IErrorData).message});
        }
    }
})));