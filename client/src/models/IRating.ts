import {IIdInput} from '@/models/IIdInput';

export interface IRating extends IIdInput {
    id: string;
    isLike: boolean;
    isDislike: boolean;
}