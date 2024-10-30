import {useUserStore} from '@/store/useUserStore';
import {IBrand} from '@/models/brand/IBrand';
import axios from 'axios';
import {IIdInput} from '@/models/IIdInput';
import {IRating} from '@/models/IRating';

export class RatingsApi {
    static BASE_URL = `${__API__}/ratings`;
    static ACCESS_TOKEN = useUserStore.getState().accessToken;
    static HEADERS = {
        authorization: `Bearer ${this.ACCESS_TOKEN}`
    };

    static async findRating(data: IIdInput): Promise<IRating | null> {
        return await axios.get(`${this.BASE_URL}`, {
            params: data,
            headers: this.HEADERS
        }).then(response => response.data);
    }

    static async like(data: IIdInput): Promise<void> {
        await axios.post(`${this.BASE_URL}/like`, data, {
            headers: this.HEADERS
        });
    }

    static async dislike(data: IIdInput): Promise<void> {
        await axios.post(`${this.BASE_URL}/dislike`, data, {
            headers: this.HEADERS
        });
    }
}