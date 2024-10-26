import {IProduct} from '@/models/product/IProduct';

export interface IProductsResponse {
    count: number;
    data: IProduct[];
}