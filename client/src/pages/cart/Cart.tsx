import React, {FC, useEffect} from 'react';
import './Cart.css';
import {useUserStore} from '@/store/useUserStore';
import {useFetchList} from '@/store/cart/useFetchList';
import Loader from '@/components/UI/loader/Loader';
import BadRequestError from '@/components/badRequestError/BadRequestError';
import Button from '@/components/UI/button/Button';
import MinusIcon from '@/assets/svg/countIcons/minusIcon.svg';
import PlusIcon from '@/assets/svg/countIcons/plusIcon.svg';
import {useCartStore} from '@/store/cart/useCartStore';
import {price} from '@/utils/price';
import {IIdInput} from '@/models/IIdInput';

const Cart: FC = () => {
    const {user} = useUserStore();
    const isActivated = user?.isActivated;

    const {isLoading, data: cartProducts} = useFetchList();
    const fetchList = useFetchList(state => state.fetchList);

    const {
        incrementCountOrAdd,
        decrementCountOrRemove,
        removeCartItem
    } = useCartStore();

    const cartHandler = async (callback: () => Promise<void>) => {
        await callback().then(() => {
            fetchList(user?.id);
        });
    };

    const addItem = async (productId: string) => {
        await cartHandler(() => incrementCountOrAdd({userId: user?.id, productId}));
    }
    const removeItem = async (id: string) => {
        await cartHandler(() => decrementCountOrRemove(id));
    }
    const removeFromCart = async (id: string) => {
        await cartHandler(() => removeCartItem(id));
    }

    useEffect(() => {
        fetchList(user?.id);
    }, []);

    if (isActivated) { // TODO change flag
        return <BadRequestError text='Activate your email to use this page'/>;
    }

    if (!cartProducts?.length) {
        return <BadRequestError text='You have no items in your cart'/>;
    }

    if (isLoading && !cartProducts.length) {
        return <Loader/>;
    }

    return (
        <div className='cart-page page'>
            <h1 className='font'>Cart items</h1>
            {cartProducts.map(item =>
                <div
                    key={item.id}
                    className='cart-page__item'
                >
                    <img
                        src={item.image}
                        alt={item.name}
                        className='cart-page__item-image'
                    />
                    <div className='cart-page__item-count'>
                        <div>
                            <Button
                                variant='icon'
                                onClick={() => removeItem(item.cartId)}
                            >
                                <MinusIcon className='cart-page__item-count-icon'/>
                            </Button>
                        </div>
                        <h2 className='font'>{item.count}</h2>
                        <div>
                            <Button
                                variant='icon'
                                onClick={() => addItem(item.id)}
                            >
                                <PlusIcon className='cart-page__item-count-icon'/>
                            </Button>
                        </div>
                    </div>
                    <div className='cart-page__item-buttons'>
                        <Button
                            variant='primary'
                            size='lg'
                        >
                            {price(item.price * item.count)}
                        </Button>
                        <Button
                            size='lg'
                            onClick={() => removeFromCart(item.cartId)}
                        >
                            Remove from cart
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;