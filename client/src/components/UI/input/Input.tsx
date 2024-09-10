import React, {FC} from 'react';
import './Input.css';

interface InputProps {
    value: string;
    type?: React.HTMLInputTypeAttribute;
    onChange: (value: string) => void;
    size?: 'sm' | 'md' | 'lg';
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}

const Input: FC<InputProps> = props => {
    return (
        <input
            type={props.type || 'text'}
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
            className={`input input_${props.size || 'md'} input-text ${props.className}`}
            placeholder={props.placeholder}
            disabled={props.disabled}
        />
    );
};

export default Input;