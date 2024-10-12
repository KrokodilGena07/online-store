import {IBaseUser} from '@/models/user/IBaseUser';

export interface IUser extends IBaseUser {
    id: string;
    role: string;
    isActivated: boolean;
}