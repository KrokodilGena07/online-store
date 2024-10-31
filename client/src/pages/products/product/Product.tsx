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

const Product: FC = () => {
    const pathnameArray = location.pathname.split('/');
    const id = pathnameArray[pathnameArray.length - 1];

    const {user} = useUserStore();

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

    const idData = {userId: user?.id, productId: id};
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
            <div className='product-page-content'>
                <div className='product-page-content-data'>
                    <div className='product-page-content__image-container'>
                        <img
                            src={product?.image}
                            alt={product?.name}
                            className='product-page-content__image'
                        />
                    </div>
                    <div>
                        <h1 className='font'>{product?.name}</h1>
                        <p className='font product-page-content-data__description'>
                            {product?.description}
                        </p>
                        <h2 className='font'>
                            Price: <span>{price(product?.price)}</span>
                        </h2>
                        <div className='product-page-content-data__infos'>
                            {product?.infos.map(info =>
                                <div
                                    key={info.id}
                                    className='product-page-content-data__infos-item font'
                                >
                                    <span className='product-page-content-data__infos-item-title'>
                                        {info.title}
                                    </span>
                                    <span>: {info.body}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='product-page-content__buttons product-page-content__buttons-group'>
                    <div className="product-page-content__buttons-group">
                        <Button
                            variant='primary'
                            size='lg'
                        >
                            Buy
                        </Button>
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
                    </div>
                    <div className="product-page-content__buttons-group">
                        <div
                            className={`
                        product-page-content__buttons-rating font ${rating?.isLike && 'blue'}
                        `}
                            onClick={likeHandler}
                        >
                            <LikeIcon className='product-page-content__buttons-rating-icon'/>
                            <p>{product?.likes}</p>
                        </div>
                        <div
                            className={`
                        product-page-content__buttons-rating font ${rating?.isDislike && 'blue'}
                        `}
                            onClick={dislikeHandler}
                        >
                            <DislikeIcon className='product-page-content__buttons-rating-icon'/>
                            <p>{product?.dislikes}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;