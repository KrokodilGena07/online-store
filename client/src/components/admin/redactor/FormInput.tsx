import React, {FC} from 'react';
import Input from '@/components/UI/input/Input';

interface FormInputProps {
    value: any;
    id: string;
    onChange: (value: string) => void;
    label: string;
}

const FormInput: FC<FormInputProps> = ({value, id, onChange, label}) => {
    return (
        <>
            <label
                htmlFor={id}
                className='font redactor-page__label'
            >
                {label}
            </label>
            <Input
                value={value}
                onChange={onChange}
                id={id}
                className='redactor-page__input'
            />
        </>
    );
};

export default FormInput;