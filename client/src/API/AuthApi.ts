import axios from 'axios';
import {IUserInput} from '@/models/user/IUserInput';
import {IAuthResponse} from '@/models/responses/IAuthResponse';

export class AuthApi {
    static BASE_URL = `${__API__}/auth`;

    static async registration(data: IUserInput): Promise<IAuthResponse> {
        return await axios.post(`${this.BASE_URL}/registration`, data, {
            withCredentials: true
        }).then(response => response.data);
    }

    static async login(data: IUserInput): Promise<IAuthResponse> {
        return await axios.post(`${this.BASE_URL}/login`, data, {
            withCredentials: true
        }).then(response => response.data);
    }

    static async logout(): Promise<void> {
        await axios.post(`${this.BASE_URL}/logout`, null, {
            withCredentials: true
        });
    }

    static async refresh(): Promise<IAuthResponse> {
        return await axios.get(`${this.BASE_URL}/refresh`, {
            withCredentials: true
        }).then(response => response.data);
    }
}