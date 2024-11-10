import React, {FC, useState} from 'react';
import './Input.css';
import {IError} from '@/models/error/IError';
import Button from '@/components/UI/button/Button';
import EyeIcon from '@/assets/svg/eyeIcons/eyeIcon.svg';
import EyeOffIcon from '@/assets/svg/eyeIcons/eyeOffIcon.svg';

interface InputProps {
    value: any;
    type?: React.HTMLInputTypeAttribute;
    onChange: (value: string) => void;
    size?: 'sm' | 'md' | 'lg';
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    id?: string;
    isInvalid?: boolean;
    error?: IError;
}

const Input: FC<InputProps> = props => {
    const css = `${props.isInvalid && 'input_invalid'} ${props.className}`;
    const [isPassword, setIsPassword] = useState(true);

    const passwordType = isPassword ? 'password' : 'text';
    const type = props.type === 'password' ? passwordType : props.type || 'text';

    const input = <input
        type={type}
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
        className={`input input_${props.size || 'md'} input-text ${css}`}
        placeholder={props.placeholder}
        disabled={props.disabled}
        id={props.id}
    />;

    const error = props.error &&
        <div className='input-error-text font'>
            {props.error.msg}
        </div>;

    if (props.type === 'password') {
        return (
            <>
                <div className='input-password-container'>
                    {input}
                    <div>
                        <Button
                            variant='icon'
                            onClick={() => setIsPassword(!isPassword)}
                            type='button'
                        >
                            {isPassword ?
                                <EyeIcon className='input-password-eye-icon'/>
                                :
                                <EyeOffIcon className='input-password-eye-icon'/>
                            }
                        </Button>
                    </div>
                </div>
                {error}
            </>
        );
    }

    return (
        <>
            {input}
            {error}
        </>
    );
};

export default Input;