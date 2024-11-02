import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {IAuthResponse} from '@/models/responses/IAuthResponse';
import {AxiosError} from 'axios';
import {AuthApi} from '@/API/AuthApi';

interface RefreshStore {
    data: IAuthResponse;
    error: AxiosError | null;
    isLoading: boolean;
    refresh: () => void;
}

export const useRefresh = create<RefreshStore>()(immer(set => ({
    data: null,
    error: null,
    isLoading: false,
    refresh: async () => {
        set({isLoading: true});
        try {
            const data = await AuthApi.refresh();
            set({isLoading: false, data});
        } catch (e) {
            set({isLoading: false, error: e});
        }
    }
})));