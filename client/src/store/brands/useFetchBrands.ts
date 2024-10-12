import {IBrand} from '@/models/IBrand';
import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {BrandsApi} from '@/API/BrandsApi';

interface FetchBrandsStore {
    isLoading: boolean;
    data: IBrand[];
    fetchBrands: () => void;
}

export const useFetchBrands = create<FetchBrandsStore>()(immer(set => ({
    isLoading: false,
    data: null,
    fetchBrands: async () => {
        set({isLoading: true});
        try {
            const data = await BrandsApi.fetchBrands();
            set({isLoading: false, data});
        } catch (e) {
            set({isLoading: false});
        }
    }
})));