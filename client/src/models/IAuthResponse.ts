import {IUser} from '@/models/IUser';

export interface IAuthResponse {
    accessToken: string;
    user: IUser;
}