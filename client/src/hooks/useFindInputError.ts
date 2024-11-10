import {IError} from '@/models/error/IError';

export const useFindInputError = (errors: IError[] | undefined) => {
    return (fieldName: string) => {
        return errors?.find(error => error.path === fieldName);
    };
};