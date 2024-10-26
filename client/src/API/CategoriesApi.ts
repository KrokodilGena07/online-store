import axios from 'axios';
import {ICategory} from '@/models/ICategory';
import {useUserStore} from '@/store/user/useUserStore';

export class CategoriesApi {
    static BASE_URL = `${__API__}/categories`;
    static ACCESS_TOKEN = useUserStore.getState().accessToken;
    static HEADERS = {
        authorization: `Bearer ${this.ACCESS_TOKEN}`
    };

    static async fetchCategories(): Promise<ICategory[]> {
        return await axios.get(this.BASE_URL)
            .then(response => response.data);
    }

    static async createCategory(name: string): Promise<ICategory> {
        return await axios.post(this.BASE_URL, {name}, {
            headers: this.HEADERS
        }).then(response => response.data);
    }

    static async updateCategory(data: ICategory): Promise<ICategory> {
        return await axios.put(this.BASE_URL, data, {
            headers: this.HEADERS
        }).then(response => response.data);
    }

    static async deleteCategory(id: string): Promise<void> {
        return await axios.delete(`${this.BASE_URL}/${id}`, {
            headers: this.HEADERS
        });
    }
}