import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {IProduct} from '@/models/product/IProduct';
import {IErrorData} from '@/models/error/IErrorData';
import {IProductInput} from '@/models/product/IProductInput';
import {ProductsApi} from '@/API/ProductsApi';
import {AxiosError} from 'axios';

interface ProductsStore {
    data: IProduct | null;
    isLoading: boolean;
    error: IErrorData | null;
    createProduct: (data: IProductInput) => Promise<void>;
    updateProduct: (data: IProductInput) => Promise<void>;
    deleteProduct: (id: string) => void;
}

export const useProductsStore = create<ProductsStore>()(immer(set => ({
    data: null,
    isLoading: false,
    error: null,
    createProduct: async (data: IProductInput) => {
        set({isLoading: true, error: null});
        try {
            const product = await ProductsApi.createProduct(data);
            set({isLoading: false, data: product});
        } catch (e) {
            const errorData = (e as AxiosError).response.data;
            set({isLoading: false, error: errorData as IErrorData});
        }
    },
    updateProduct: async (data: IProductInput) => {
        set({isLoading: true, error: null});
        try {
            const product = await ProductsApi.updateProduct(data);
            set({isLoading: false, data: product});
        } catch (e) {
            const errorData = (e as AxiosError).response.data;
            set({isLoading: false, error: errorData as IErrorData});
        }
    },
    deleteProduct: async (id: string) => {
        await ProductsApi.deleteProduct(id)
            .catch(err => {});
    }
})));