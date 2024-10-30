import axios from 'axios';
import {IProduct} from '@/models/product/IProduct';
import {IProductQuery} from '@/models/product/IProductQuery';
import {IProductsResponse} from '@/models/responses/IProductsResponse';
import {useUserStore} from '@/store/useUserStore';
import {IProductInput} from '@/models/product/IProductInput';

export class ProductsApi {
    static BASE_URL = `${__API__}/products`;
    static ACCESS_TOKEN = useUserStore.getState().accessToken;
    static HEADERS = {
        authorization: `Bearer ${this.ACCESS_TOKEN}`
    };

    static async fetchProducts(data: IProductQuery): Promise<IProductsResponse> {
        return await axios.get(this.BASE_URL, {params: data})
            .then(response => response.data);
    }

    static async fetchProductsByIds(list: string[]): Promise<IProduct[]> {
        return await axios.get(`${this.BASE_URL}/list`, {
            params: {list: JSON.stringify(list)}
        }).then(response => response.data);
    }

    static async fetchProduct(id: string): Promise<IProduct | null> {
        return await axios.get(`${this.BASE_URL}/one/${id}`)
            .then(response => response.data);
    }

    static async createProduct(data: IProductInput): Promise<IProduct> {
        const formData = new FormData();
        for (const dataKey in data) {
            formData.append(dataKey, data[dataKey as keyof typeof data]);
        }

        return await axios.post(this.BASE_URL, formData, {
            headers: this.HEADERS
        }).then(response => response.data);
    }

    static async updateProduct(data: IProductInput): Promise<IProduct> {
        const formData = new FormData();
        for (const dataKey in data) {
            formData.append(dataKey, data[dataKey as keyof typeof data]);
        }

        return await axios.put(this.BASE_URL, formData, {
            headers: this.HEADERS
        }).then(response => response.data);
    }

    static async deleteProduct(id: string): Promise<void> {
        await axios.delete(`${this.BASE_URL}/${id}`, {
            headers: this.HEADERS
        });
    }
}