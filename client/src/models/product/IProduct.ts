import {IProductBase} from '@/models/product/IProductBase';
import {IInfo} from '@/models/info/IInfo';

export interface IProduct extends IProductBase {
    image: string;
    likes: number;
    dislikes: number;
    price: number;
    infos: IInfo[];
}