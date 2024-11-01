import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {IBrand} from '@/models/brand/IBrand';
import {IErrorData} from '@/models/error/IErrorData';
import {IBrandInput} from '@/models/brand/IBrandInput';
import {BrandsApi} from '@/API/BrandsApi';
import {AxiosError} from 'axios';

interface BrandsStore {
    data: IBrand | null;
    isLoading: boolean;
    error: IErrorData | null;
    createBrand: (data: IBrandInput) => void;
    updateBrand: (data: IBrand) => Promise<void>;
    deleteBrand: (id: string) => Promise<void>;
}

export const useBrandsStore = create<BrandsStore>()(immer(set => ({
    data: null,
    isLoading: false,
    error: null,
    createBrand: async (data: IBrandInput) => {
        set({isLoading: true, error: null});
        try {
            const brand = await BrandsApi.createBrand(data);
            set({isLoading: false, data: brand});
        } catch (e) {
            const errorData = (e as AxiosError).response.data;
            set({isLoading: false, error: errorData as IErrorData});
        }
    },
    updateBrand: async (data: IBrand) => {
        set({isLoading: true, error: null});
        try {
            const brand = await BrandsApi.updateBrand(data);
            set({isLoading: false, data: brand});
        } catch (e) {
            const errorData = (e as AxiosError).response.data;
            set({isLoading: false, error: errorData as IErrorData});
        }
    },
    deleteBrand: async (id: string) => {
        await BrandsApi.deleteBrand(id)
            .catch(err => {});
    }
})));