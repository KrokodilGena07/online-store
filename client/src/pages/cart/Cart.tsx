import React, {FC, useEffect} from 'react';
import './Cart.css';
import {useUserStore} from '@/store/user/useUserStore';
import Button from '@/components/UI/button/Button';
import {useNavigate} from 'react-router-dom';
import {useFetchList} from '@/store/cart/useFetchList';
import Loader from '@/components/UI/loader/Loader';
import {useDeleteFromCart} from '@/store/cart/useDeleteFromCart';
import CartList from '@/components/cart/CartList';
import {useAddToCart} from '@/store/cart/useAddToCart';

const Cart: FC = () => {
    const {user} = useUserStore(state => state);
    const isActivated = user?.isActivated;

    const {isLoading, data: cartItems} = useFetchList();
    const fetchList = useFetchList(state => state.fetchList);

    const remove = useDeleteFromCart(state => state.remove);
    const removeFromCart = async (id: string) => {
        await remove(id)
            .then(() => {
                fetchList(user?.id);
            });
    };

    const navigate = useNavigate();
    const navBack = () => navigate(-1);

    useEffect(() => {
        fetchList(user?.id);
    }, []);

    if (isActivated) {
        return (
            <div className='center-container cart-page_not-activated'>
                <h1 className='cart-page_not-activated__text'>Activate your email to use this page</h1>
                <Button
                    onClick={navBack}
                    size='lg'
                    className='cart-page_not-activated__button'
                >
                    Back
                </Button>
            </div>
        );
    }

    if (isLoading) {
        return <Loader/>;
    }

    return (
        <div className='cart-page_activated header-margin'>
            {!!cartItems?.length &&
                <h1 className='cart-page_activated__text'>Cart items</h1>
            }
            <CartList
                cartItems={cartItems}
                deleteFromCart={removeFromCart}
                userId={user?.id}
            />
        </div>
    );
};

export default Cart;