import {IUser} from '@/models/user/IUser';

export interface IAuthResponse {
    accessToken: string;
    user: IUser;
}