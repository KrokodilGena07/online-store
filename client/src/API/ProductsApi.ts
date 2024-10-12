import axios from 'axios';
import {IProduct} from '@/models/product/IProduct';
import {IProductQuery} from '@/models/product/IProductQuery';
import {IProductsResponse} from '@/models/IProductsResponse';

export class ProductsApi {
    static BASE_URL = `${__API__}/products`;

    static async fetchProducts(data: IProductQuery): Promise<IProductsResponse> {
        return await axios.get(`${this.BASE_URL}`, {params: data})
            .then(response => response.data);
    }
}