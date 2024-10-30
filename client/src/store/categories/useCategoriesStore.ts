import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {ICategory} from '@/models/ICategory';
import {IErrorData} from '@/models/error/IErrorData';
import {CategoriesApi} from '@/API/CategoriesApi';
import {AxiosError} from 'axios';

interface CategoriesStore {
    data: ICategory | null;
    isLoading: boolean;
    error: IErrorData | null;
    createCategory: (name: string) => void;
    updateCategory: (data: ICategory) => void;
    deleteCategory: (id: string) => void;
}

export const useCategoriesStore = create<CategoriesStore>()(immer(set => ({
    data: null,
    isLoading: false,
    error: null,
    createCategory: async (name: string) => {
        set({isLoading: true});
        try {
            const data = await CategoriesApi.createCategory(name);
            set({isLoading: false, data});
        } catch (e) {
            const errorData = (e as AxiosError).response.data;
            set({isLoading: false, error: errorData as IErrorData});
        }
    },
    updateCategory: async (data: ICategory) => {
        set({isLoading: true});
        try {
            const category = await CategoriesApi.updateCategory(data);
            set({isLoading: false, data: category});
        } catch (e) {
            const errorData = (e as AxiosError).response.data;
            set({isLoading: false, error: errorData as IErrorData});
        }
    },
    deleteCategory: async (id: string) => {
        await CategoriesApi.deleteCategory(id)
            .catch(err => {});
    }
})));