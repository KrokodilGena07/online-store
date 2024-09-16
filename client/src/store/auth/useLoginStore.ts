import {create} from 'zustand';
import {IUserInput} from '@/models/IUserInput';
import {immer} from 'zustand/middleware/immer';
import {AuthApi} from '@/API/AuthApi';
import {IAuthResponse} from '@/models/IAuthResponse';

interface LoginStore {
    isLoading: boolean;
    login: (user: IUserInput) => Promise<IAuthResponse>;
}

export const useLoginStore = create<LoginStore>()(immer(set => ({
    isLoading: false,
    login: async (user: IUserInput): Promise<IAuthResponse> => {
        set({isLoading: true});
        try {
            const data = await AuthApi.login(user);
            set({isLoading: false});
            return data;
        } catch (e) {
            set({isLoading: false});
            throw e;
        }
    }
})));