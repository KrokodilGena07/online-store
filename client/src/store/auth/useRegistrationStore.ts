import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {IUserInput} from '@/models/user/IUserInput';
import {AuthApi} from '@/API/AuthApi';
import {IAuthResponse} from '@/models/responses/IAuthResponse';

interface RegistrationStore {
    isLoading: boolean;
    registration: (user: IUserInput) => Promise<IAuthResponse>;
}

export const useRegistrationStore = create<RegistrationStore>()(immer(set => ({
    isLoading: false,
    registration: async (user: IUserInput): Promise<IAuthResponse> => {
        set({isLoading: true});
        try {
            const data = await AuthApi.registration(user);
            set({isLoading: false});
            return data;
        } catch (e) {
            set({isLoading: false});
            throw e;
        }
    }
})));