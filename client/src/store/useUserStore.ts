import {create} from 'zustand';
import {IUser} from '@/models/IUser';
import {IAuthResponse} from '@/models/IAuthResponse';

interface UserStore {
    user?: IUser;
    accessToken?: string;
    setUser: (response: IAuthResponse) => void;
    removeUser: () => void;
}

export const useUserStore = create<UserStore>()(set => ({
    user: JSON.parse(localStorage.getItem('User') || 'null'),
    accessToken: localStorage.getItem('Token'),
    setUser: (response: IAuthResponse) => set(state => {
        localStorage.setItem('User', JSON.stringify(response.user));
        localStorage.setItem('Token', response.accessToken);
        return {
            user: response.user,
            accessToken: response.accessToken
        };
    }),
    removeUser: () => set(state => {
        localStorage.clear();
        return {
            user: null,
            accessToken: null
        };
    })
}));