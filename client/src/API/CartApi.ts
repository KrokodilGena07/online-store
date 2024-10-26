import {useUserStore} from '@/store/user/useUserStore';
import axios from 'axios';
import {ICartItem} from '@/models/cart/ICartItem';
import {ICartItemInput} from '@/models/cart/ICartItemInput';

export class CartApi {
    static BASE_URL = `${__API__}/cart`;
    static ACCESS_TOKEN = useUserStore.getState().accessToken;
    static HEADERS = {
        authorization: `Bearer ${this.ACCESS_TOKEN}`
    };

    static async fetchCartItems(id: string): Promise<ICartItem[]> {
        return await axios.get(`${this.BASE_URL}/list/${id}`, {
            headers: this.HEADERS
        }).then(response => response.data)
    }

    static async fetchCartItem(data: ICartItemInput): Promise<ICartItem> {
        return await axios.get(`${this.BASE_URL}/one`, {
            params: data,
            headers: this.HEADERS
        }).then(response => response.data);
    }

    static async incrementCountOrAdd(data: ICartItemInput): Promise<ICartItem> {
        return await axios.post(this.BASE_URL, data, {
            headers: this.HEADERS
        }).then(response => response.data);
    }

    static async decrementCountOrRemove(id: string): Promise<ICartItem> {
        return await axios.put(this.BASE_URL, {id}, {
            headers: this.HEADERS
        }).then(response => response.data);
    }

    static async removeCartItem(id: string): Promise<void> {
        await axios.delete(`${this.BASE_URL}/${id}`, {
            headers: this.HEADERS
        });
    }
}