import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {AuthApi} from '@/API/AuthApi';
import {IAuthResponse} from '@/models/responses/IAuthResponse';
import {IErrorData} from '@/models/error/IErrorData';
import {IUserInput} from '@/models/user/IUserInput';
import {AxiosError} from 'axios';

interface AuthStore {
    data: IAuthResponse | null;
    error: IErrorData | null;
    isLoading: boolean;
    registration: (data: IUserInput) => Promise<IAuthResponse>;
    login: (data: IUserInput) => Promise<IAuthResponse>;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>()(immer(set => ({
    data: null,
    error: null,
    isLoading: false,
    registration: async (data) => {
        set({isLoading: true, error: null});
        try {
            const response = await AuthApi.registration(data);
            set({isLoading: false, data: response});
            return response;
        } catch (e) {
            const errorData = (e as AxiosError).response.data;
            set({isLoading: false, error: errorData as IErrorData});
            throw e;
        }
    },
    login: async (data) => {
        set({isLoading: true, error: null});
        try {
            const response = await AuthApi.login(data);
            set({isLoading: false, data: response});
            return response;
        } catch (e) {
            const errorData = (e as AxiosError).response.data;
            set({isLoading: false, error: errorData as IErrorData});
            throw e;
        }
    },
    logout: async () => {
        await AuthApi.logout()
            .catch(err => {});
    }
})));