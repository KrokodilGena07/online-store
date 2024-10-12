import axios from 'axios';
import {IBrand} from '@/models/IBrand';

export class BrandsApi {
    static BASE_URL = `${__API__}/brands`;

    static async fetchBrands(): Promise<IBrand[]> {
        return await axios.get(`${this.BASE_URL}`)
            .then(response => response.data);
    }
}