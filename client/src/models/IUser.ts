import {IBaseUser} from '@/models/IBaseUser';

export interface IUser extends IBaseUser {
    id: string;
    role: string;
    isActivated: boolean;
}