import {IError} from '@/models/error/IError';

export interface IErrorData {
    message: string;
    errors?: IError[];
}