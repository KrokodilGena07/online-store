import {create} from 'zustand';
import {IUser} from '@/models/IUser';
import {IAuthResponse} from '@/models/IAuthResponse';
import {immer} from 'zustand/middleware/immer';

interface UserStore {
    user?: IUser;
    accessToken?: string;
    setUser: (response: IAuthResponse) => void;
    removeUser: () => void;
}

export const useUserStore = create<UserStore>()(immer(set => ({
    user: JSON.parse(localStorage.getItem('User') || 'null'),
    accessToken: localStorage.getItem('Token'),
    setUser: (response: IAuthResponse) => {
        localStorage.setItem('User', JSON.stringify(response.user));
        localStorage.setItem('Token', response.accessToken);
        set({user: response.user, accessToken: response.accessToken});
    },
    removeUser: () => {
        localStorage.clear();
        set({
            user: null,
            accessToken: null
        });
    }
})));