import {IBaseUser} from '@/models/user/IBaseUser';

export interface IUserInput extends IBaseUser {
    password: string;
}