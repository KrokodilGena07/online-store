import React, {FC} from 'react';
import {ICartProduct} from '@/models/ICartProduct';
import Button from '@/components/UI/button/Button';
import MinusIcon from '@/assets/svg/minusIcon.svg';
import PlusIcon from '@/assets/svg/plusIcon.svg';
import {useNavigate} from 'react-router-dom';
import {useAddToCart} from '@/store/cart/useAddToCart';
import {ICartItemInput} from '@/models/ICartItemInput';
import {useFetchList} from '@/store/cart/useFetchList';
import {useRemoveFromCart} from '@/store/cart/useRemoveFromCart';

interface CartListProps {
    cartItems: ICartProduct[] | null;
    deleteFromCart: (cartId: string) => void;
    userId: string;
}

const CartList: FC<CartListProps> = ({cartItems, deleteFromCart, userId}) => {
    const navigate = useNavigate();
    const navBack = () => navigate(-1);

    const fetchList = useFetchList(state => state.fetchList);

    const plus = useAddToCart(state => state.addToCart);
    const minus = useRemoveFromCart(state => state.removeFromCart);
    const addToCart = async (cartInput: ICartItemInput) => {
        await plus(cartInput)
            .then(async () => {
                fetchList(userId);
            })
    };

    const removeFromCart = async (id: string) => {
        await minus(id)
            .then(async () => {
                fetchList(userId);
            })
    }

    if (!cartItems?.length) {
        return (
            <div className='cart-page_activated__cart-error'>
                <h1>You have not items in your cart</h1>
                <Button
                    size='lg'
                    onClick={navBack}
                    className='cart-page_activated__cart-error-button'
                >
                    Back
                </Button>
            </div>
        );
    }

    return (
        <div className='cart-page_activated__cart'>
            {cartItems.map(item =>
                <div
                    key={item.id}
                    className='cart-page_activated__cart-item'
                >
                    <div className='cart-page_activated__cart-item-main'>
                        <img
                            src={item.image}
                            alt={item.name}
                            className='cart-page_activated__cart-item-main-image'
                        />
                        <h2>{item.name}</h2>
                    </div>
                    <div className='cart-page_activated__cart-item-count'>
                        <Button
                            variant='icon'
                            onClick={() => removeFromCart(item.cartId)}
                        >
                            <MinusIcon
                                className='cart-page_activated__cart-item-count-icon'
                            />
                        </Button>
                        <h2>{item.count}</h2>
                        <Button
                            variant='icon'
                            onClick={() => addToCart({productId: item.id, userId})}
                        >
                            <PlusIcon
                                className='cart-page_activated__cart-item-count-icon'
                            />
                        </Button>
                    </div>
                    <div className='cart-page_activated__cart-item-buttons'>
                        <Button variant='primary'>
                            Buy
                        </Button>
                        <Button
                            onClick={() => deleteFromCart(item.cartId)}
                        >
                            Remove from cart
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartList;