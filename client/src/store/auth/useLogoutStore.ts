import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {AuthApi} from '@/API/AuthApi';

interface LogoutStore {
    logout: () => void;
}

export const useLogoutStore = create<LogoutStore>()(immer(set => ({
    logout: async () => {
        await AuthApi.logout()
            .catch(error => error);
    }
})));