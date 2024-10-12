import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {ICategory} from '@/models/ICategory';
import {CategoriesApi} from '@/API/CategoriesApi';

interface FetchCategoriesStore {
    isLoading: boolean;
    data: ICategory[];
    fetchCategories: () => void;
}

export const useFetchCategories = create<FetchCategoriesStore>()(immer(set => ({
    isLoading: false,
    data: null,
    fetchCategories: async () => {
        set({isLoading: true});
        try {
            const data = await CategoriesApi.fetchCategories();
            set({isLoading: false, data});
        } catch (e) {
            set({isLoading: false});
        }
    }
})));