import {IIdInput} from '@/models/IIdInput';

export interface ICartItem extends IIdInput {
    id: string;
    count: number;
}