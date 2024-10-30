import React, {FC, useEffect} from 'react';
import './Product.css';
import {useFetchProduct} from '@/store/products/useFetchProduct';
import Loader from '@/components/UI/loader/Loader';
import BadRequestError from '@/components/badRequestError/BadRequestError';
import Button from '@/components/UI/button/Button';
import CloseIcon from '@/assets/svg/close.svg';
import {useNavigate} from 'react-router-dom';
import {useCartStore} from '@/store/cart/useCartStore';
import {useUserStore} from '@/store/useUserStore';
import {price} from '@/utils/price';

const Product: FC = () => {
    const pathnameArray = location.pathname.split('/');
    const id = pathnameArray[pathnameArray.length - 1];

    const {user} = useUserStore();

    const navigate = useNavigate();
    const navBack = () => navigate(-1);

    const add = useCartStore(state => state.incrementCountOrAdd);
    const addToCart = async () => {
        await add({productId: id, userId: user?.id});
    };

    const {data: product, isLoading, error} = useFetchProduct();
    const fetchProduct = useFetchProduct(state => state.fetchProduct);

    useEffect(() => {
        fetchProduct(id);
    }, []);

    if (isLoading) {
        return <Loader/>;
    }

    if (error) {
        return <BadRequestError text={error}/>
    }

    return (
        <div className='product-page page'>
            <div className='product-page__content'>
                <div className='product-page__content-body'>
                    <div>
                        <img
                            src={product?.image}
                            alt={product?.name}
                            className='product-page__content-image'
                        />
                    </div>
                    <div className='product-page__content-data'>
                        <div className='product-page__content-head'>
                            <h1 className='font'>
                                {product?.name}
                            </h1>
                            <div>
                                <Button
                                    variant='icon'
                                    onClick={navBack}
                                >
                                    <CloseIcon className='product-page__content-close-icon'/>
                                </Button>
                            </div>
                        </div>
                        <p className='font product-page__content-description'>
                            {product?.description}
                        </p>
                        <h2 className='font'>Price: {price(product?.price)}</h2>
                        <div className="product-page__content-infos">
                            {product?.infos.map(info =>
                                <div
                                    key={info.id}
                                    className='font product-page__content-infos-item'
                                >
                                    <span className='product-page__content-infos-item-title'>{info.title}</span>: {info.body}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='product-page__content-buttons'>
                    <Button
                        size='lg'
                        variant='primary'
                    >
                        Buy
                    </Button>
                    <Button
                        size='lg'
                        onClick={addToCart}
                    >
                        Add to cart
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Product;