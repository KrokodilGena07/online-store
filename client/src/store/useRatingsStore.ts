import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {RatingsApi} from '@/API/RatingsApi';
import {IIdInput} from '@/models/IIdInput';
import {IRating} from '@/models/IRating';

interface RatingsStore {
    data: IRating | null;
    isLoading: boolean;
    findRating: (data: IIdInput) => Promise<void>;
    like: (data: IIdInput) => Promise<void>;
    dislike: (data: IIdInput) => Promise<void>;
}

export const useRatingsStore = create<RatingsStore>()(immer(set => ({
    data: null,
    isLoading: false,
    findRating: async (data: IIdInput) => {
        set({isLoading: true, data: null});
        try {
            const rating = await RatingsApi.findRating(data);
            set({data: rating, isLoading: false});
        } catch (e) {
            set({isLoading: false});
        }
    },
    like: async (data: IIdInput) => {
        await RatingsApi.like(data)
            .catch(err => {});
    },
    dislike: async (data: IIdInput) => {
        await RatingsApi.dislike(data)
            .catch(err => {});
    }
})));