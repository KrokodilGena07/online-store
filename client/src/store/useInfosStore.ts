import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {InfosApi} from '@/API/InfosApi';
import {IInfoInput} from '@/models/info/IInfoInput';
import {IInfoUpdateInput} from '@/models/info/IInfoUpdateInput';
import {IInfo} from '@/models/info/IInfo';
import {IErrorData} from '@/models/error/IErrorData';
import {AxiosError} from 'axios';

interface InfosStore {
    isLoading: boolean;
    data: IInfo | null;
    error: IErrorData | null;
    createInfo: (data: IInfoInput) => Promise<void>;
    updateInfo: (data: IInfoUpdateInput) => Promise<void>;
    deleteInfo: (id: string) => Promise<void>;
}

export const useInfosStore = create<InfosStore>()(immer(set => ({
    isLoading: false,
    data: null,
    error: null,
    createInfo: async (data) => {
        set({isLoading: true, error: null});
        try {
            const info = await InfosApi.createInfo(data);
            set({isLoading: false, data: info});
        } catch (e) {
            const errorData = (e as AxiosError).response.data;
            set({isLoading: false, error: errorData as IErrorData});
        }
    },
    updateInfo: async (data) => {
        set({isLoading: true, error: null});
        try {
            const info = await InfosApi.updateInfo(data);
            set({isLoading: false, data: info});
        } catch (e) {
            const errorData = (e as AxiosError).response.data;
            set({isLoading: false, error: errorData as IErrorData});
        }
    },
    deleteInfo: async (id: string) => {
        await InfosApi.deleteInfo(id)
            .catch(err => {});
    }
})));