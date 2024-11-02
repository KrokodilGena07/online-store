import React, {FC} from 'react';
import './Button.css';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'default' | 'icon';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    disabled?: boolean;
    type?: 'reset' | 'submit' | 'button';
}

const Button: FC<ButtonProps> = props => {
    const style = props.variant === 'icon' ?
        `button_${props.variant}`
        :
        `button_${props.variant || 'default'} button_${props.size || 'md'}`
    ;

    return (
        <button
            onClick={props.onClick}
            className={`button ${style} ${props.className}`}
            disabled={props.disabled}
            type={props.type}
        >
            {props.children}
        </button>
    );
};

export default Button;