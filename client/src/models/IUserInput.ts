import {IBaseUser} from '@/models/IBaseUser';

export interface IUserInput extends IBaseUser {
    password: string;
}