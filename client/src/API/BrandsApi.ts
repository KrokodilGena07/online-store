import axios from 'axios';
import {IBrand} from '@/models/IBrand';
import {useUserStore} from '@/store/user/useUserStore';
import {IBrandInput} from '@/models/IBrandInput';

export class BrandsApi {
    static BASE_URL = `${__API__}/brands`;
    static ACCESS_TOKEN = useUserStore.getState().accessToken;
    static HEADERS = {
        authorization: `Bearer ${this.ACCESS_TOKEN}`
    };

    static async fetchBrands(): Promise<IBrand[]> {
        return await axios.get(`${this.BASE_URL}`)
            .then(response => response.data);
    }

    static async createBrand(data: IBrandInput): Promise<IBrand> {
        const formData = new FormData();
        for (const dataKey in data) {
            formData.append(dataKey, data[dataKey as keyof typeof data]);
        }

        return await axios.post(this.BASE_URL, formData, {
            headers: this.HEADERS
        }).then(response => response.data);
    }

    static async updateBrand(data: IBrand): Promise<IBrand> {
        const formData = new FormData();
        for (const dataKey in data) {
            formData.append(dataKey, data[dataKey as keyof typeof data]);
        }

        return await axios.put(this.BASE_URL, data, {
            headers: this.HEADERS
        }).then(response => response.data);
    }

    static async deleteBrand(id: string): Promise<void> {
        return await axios.delete(`${this.BASE_URL}/${id}`, {
            headers: this.HEADERS
        });
    }
}