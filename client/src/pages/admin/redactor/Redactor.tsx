import React, {FC, useEffect, useState} from 'react';
import './Redactor.css';
import {useFetchProduct} from '@/store/products/useFetchProduct';
import Loader from '@/components/UI/loader/Loader';
import Button from '@/components/UI/button/Button';
import {useNavigate} from 'react-router-dom';
import Input from '@/components/UI/input/Input';
import {IProduct} from '@/models/product/IProduct';

const Redactor: FC = () => {
    const locationList = location.pathname.split('/');
    const id = locationList[locationList.length - 1];

    const navigate = useNavigate();
    const navBack = () => navigate(-1);

    const {isLoading, data: product, error} = useFetchProduct();
    const fetchProduct = useFetchProduct(state => state.fetchProduct);

    const [currentProduct, setCurrentProduct] = useState<IProduct | null>(null);

    useEffect(() => {
        fetchProduct(id);
    }, []);
    useEffect(() => {
        if (product) {
            setCurrentProduct(product);
        }
    }, [product]);

    if (isLoading) {
        return <Loader/>;
    }

    if (error) {
        return (
            <div className='center-container redactor-page__error'>
                <h1 className='font'>{error}</h1>
                <Button
                    size='lg'
                    onClick={navBack}
                    className='redactor-page__error-button'
                >
                    Back
                </Button>
            </div>
        );
    }

    return (
        <div className='redactor-page header-margin'>
            <h2 className='font'>
                Product body
            </h2>
            <label
                htmlFor='name'
                className='redactor-page__field-label font'
            >
                Name
            </label>
            <Input
                value={currentProduct?.name}
                onChange={v => setCurrentProduct({...currentProduct, name: v})}
                size='lg'
                id='name'
                className='redactor-page__field-input'
            />
            <label
                htmlFor='description'
                className='redactor-page__field-label font'
            >
                Description
            </label>
            <Input
                value={currentProduct?.description}
                onChange={v => setCurrentProduct({...currentProduct, description: v})}
                size='lg'
                id='description'
                className='redactor-page__field-input'
            />
            <h2 className='font'>
                Product infos
            </h2>
        </div>
    );
};

export default Redactor;