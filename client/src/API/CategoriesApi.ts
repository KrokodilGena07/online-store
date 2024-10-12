import axios from 'axios';
import {ICategory} from '@/models/ICategory';

export class CategoriesApi {
    static BASE_URL = `${__API__}/categories`;

    static async fetchCategories(): Promise<ICategory[]> {
        return await axios.get(`${this.BASE_URL}`)
            .then(response => response.data);
    }
}