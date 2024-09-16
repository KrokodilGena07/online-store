import {IError} from '@/models/IError';

export interface IErrorData {
    message: string;
    errors?: IError[];
}