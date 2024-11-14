import React, {FC, useEffect} from 'react';
import './Product.css';
import {useFetchProduct} from '@/store/products/useFetchProduct';
import Loader from '@/components/UI/loader/Loader';
import BadRequestError from '@/components/badRequestError/BadRequestError';
import Button from '@/components/UI/button/Button';
import {useCartStore} from '@/store/cart/useCartStore';
import {useFetchCartItem} from '@/store/cart/useFetchCartItem';
import {useUserStore} from '@/store/useUserStore';
import LikeIcon from '@/assets/svg/ratingIcon/likeIcon.svg';
import DislikeIcon from '@/assets/svg/ratingIcon/dislikeIcon.svg';
import {useRatingsStore} from '@/store/useRatingsStore';
import {price} from '@/utils/price';
import {Link} from 'react-router-dom';

const Product: FC = () => {
    const pathnameArray = location.pathname.split('/');
    const id = pathnameArray[pathnameArray.length - 1];

    const {user} = useUserStore();
    const isAdmin = user?.role === 'ADMIN';
    const idData = {userId: user?.id, productId: id};

    const {data: product, isLoading: isProductLoading, error} = useFetchProduct();
    const fetchProduct = useFetchProduct(state => state.fetchProduct);

    const {incrementCountOrAdd, removeCartItem} = useCartStore();

    const {isLoading: isCartLoading, data: cart} = useFetchCartItem();
    const fetchCartItem = useFetchCartItem(state => state.fetchCartItem);

    const {data: rating, isLoading: isRatingLoading} = useRatingsStore();
    const {like, dislike, findRating} = useRatingsStore();

    const ratingHandler = async () => {
        await findRating(idData).then(() => fetchProduct(id));
    }
    const likeHandler = async () => {
        await like(idData).then(() => ratingHandler());
    };
    const dislikeHandler = async () => {
        await dislike(idData).then(() => ratingHandler());
    };

    const updateCartFlag = () => fetchCartItem(idData);
    const add = () => {
        incrementCountOrAdd(idData).then(updateCartFlag);
    }
    const remove = () => {
        removeCartItem(cart?.id).then(updateCartFlag);
    }

    const isLoading = isProductLoading || isCartLoading || isRatingLoading;

    useEffect(() => {
        fetchProduct(id);
        fetchCartItem(idData);
        findRating(idData);
    }, []);

    if (isLoading) {
        return <Loader/>;
    }

    if (error) {
        return <BadRequestError text={error}/>;
    }

    return (
        <div className='page product-page'>
            <div className='product-page__body'>
                <div className='product-page__main'>
                    <div className='product-page__image-container'>
                        <img
                            src={product?.image}
                            alt={product?.name}
                            className='product-page__image'
                        />
                    </div>
                    <div>
                        <h1>{product?.name}</h1>
                        <p className='product-page__description'>
                            {product?.description}
                        </p>
                        <h2>Price: <span>{price(product?.price)}</span></h2>
                        <div className='product-page__infos'>
                            {product?.infos.map(info =>
                                <div
                                    key={info.id}
                                    className='product-page__infos-item'
                                >
                                    <span className='product-page__infos-item-title'>
                                        {info.title}
                                    </span>
                                    <span>: {info.body}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='product-page__buttons product-page__buttons-container'>
                    <div className="product-page__buttons-container">
                        <Button
                            variant='primary'
                            size='lg'
                        >
                            Buy
                        </Button>
                        {user &&
                            <Button
                                size='lg'
                                onClick={cart ? remove : add}
                            >
                                {cart ?
                                    'Remove from cart'
                                    :
                                    'Add to cart'
                                }
                            </Button>
                        }
                        {isAdmin &&
                            <Link to={`/admin/redactor/${id}`}>
                                <Button size='lg'>Redactor</Button>
                            </Link>
                        }
                    </div>
                    {user &&
                        <div className="product-page__buttons-container">
                            <div
                                className={`product-page__rating-button ${rating?.isLike && 'blue'}`}
                                onClick={likeHandler}
                            >
                                <LikeIcon className='product-page__rating-icon'/>
                                <p>{product?.likes}</p>
                            </div>
                            <div
                                className={`product-page__rating-button ${rating?.isDislike && 'blue'}`}
                                onClick={dislikeHandler}
                            >
                                <DislikeIcon className='product-page__rating-icon'/>
                                <p>{product?.dislikes}</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Product;