import React, {FC} from 'react';
import './Error.css';
import ErrorIcon from '@/assets/svg/error.svg';
import Button from '@/components/UI/button/Button';
import {useNavBack} from '@/hooks/useNavBack';

const Error: FC = () => {
    const navBack = useNavBack();
    return (
        <div className='error-page center-container'>
            <div className='error-page__body'>
                <ErrorIcon
                    className='error-page__icon'
                />
                <h1 className='error-page__text'>
                    Page not found
                </h1>
            </div>
            <Button
                size='lg'
                onClick={navBack}
                className='error-page__button button_black'
            >
                Back
            </Button>
        </div>
    );
};

export default Error;