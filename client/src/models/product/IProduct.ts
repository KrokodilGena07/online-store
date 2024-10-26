import {IProductBase} from '@/models/product/IProductBase';

export interface IProduct extends IProductBase {
    id: string;
    image: string;
    likes: number;
    dislikes: number;
    price: number;
}