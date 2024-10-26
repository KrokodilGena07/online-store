import {ICartItemInput} from '@/models/cart/ICartItemInput';

export interface ICartItem extends ICartItemInput {
    id: string;
    count: number;
}