import {IProductBase} from '@/models/product/IProductBase';

export interface IProductInput extends IProductBase {
    image: File;
    price: string;
    id: string;
}