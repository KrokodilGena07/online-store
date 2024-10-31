import React, {FC} from 'react';
import './BadRequestError.css';
import Button from '@/components/UI/button/Button';
import {useNavBack} from '@/hooks/useNavBack';

interface BadRequestErrorProps {
    text: string;
    callback?: () => void;
    buttonText?: string;
}

const BadRequestError: FC<BadRequestErrorProps> = ({text, callback, buttonText}) => {
    const navBack = useNavBack();

    return (
        <div className='bad-request-error center-container'>
            <h1 className='bad-request-error__text font'>{text}</h1>
            <Button
                onClick={callback || navBack}
                size='lg'
                className='button_black'
            >
                {buttonText || 'Back'}
            </Button>
        </div>
    );
};

export default BadRequestError;