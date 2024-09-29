import React, {FC} from 'react';
import './Error.css';
import ErrorIcon from '@/assets/svg/error.svg';
import Button from '@/components/UI/button/Button';
import {useNavigate} from 'react-router-dom';

const Error: FC = () => {
    const navigate = useNavigate();
    const navigateBack = () => navigate(-1);

    return (
        <div className='error-page center-container'>
            <div className='error-page__content'>
                <ErrorIcon
                    className='error-page__content-icon'
                />
                <h1 className='error-page__content-text'>
                    Page not found
                </h1>
            </div>
            <Button
                size='lg'
                onClick={navigateBack}
                className='error-page__button'
            >
                Back
            </Button>
        </div>
    );
};

export default Error;