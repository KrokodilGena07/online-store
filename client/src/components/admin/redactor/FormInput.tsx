import React, {FC} from 'react';
import Input from '@/components/UI/input/Input';
import {IError} from '@/models/error/IError';

interface FormInputProps {
    value: any;
    id: string;
    onChange: (value: string) => void;
    label: string;
    isInvalid?: boolean;
    error?: IError;
    className?: string;
}

const FormInput: FC<FormInputProps> = (props) => {
    return (
        <>
            <label
                htmlFor={props.id}
                className={`font redactor-page__label ${props.className}`}
            >
                {props.label}
            </label>
            <Input
                value={props.value}
                onChange={props.onChange}
                id={props.id}
                isInvalid={props.isInvalid}
                error={props.error}
            />
        </>
    );
};

export default FormInput;