import React, {FC} from 'react';
import './BadRequestError.css';
import Button from '@/components/UI/button/Button';
import {useNavigate} from 'react-router-dom';

interface BadRequestErrorProps {
    text: string;
}

const BadRequestError: FC<BadRequestErrorProps> = ({text}) => {
    const navigate = useNavigate();
    const navBack = () => navigate(-1);

    return (
        <div className='bad-request-error center-container'>
            <h1 className='bad-request-error__text font'>{text}</h1>
            <Button
                onClick={navBack}
                size='lg'
                className='bad-request-error__button'
            >
                Back
            </Button>
        </div>
    );
};

export default BadRequestError;