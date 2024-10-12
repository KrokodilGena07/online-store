import React, {FC} from 'react';
import './ProductItem.css';
import {IProduct} from '@/models/product/IProduct';
import Button from '@/components/UI/button/Button';
import {price} from '@/utils/price';
import {useNavigate} from 'react-router-dom';

interface ProductItemProps {
    product: IProduct;
}

const ProductItem: FC<ProductItemProps> = ({product}) => {
    const navigate = useNavigate();
    const nav = (id: string) => {
        navigate(`/products/${id}`);
    };

    return (
        <div className='product-item'>
            <div>
                <img
                    src={product.image}
                    alt={product.name}
                    className='product-item__body-image'
                />
                <h2>{product.name}</h2>
                <h3>{price(product.price)}</h3>
            </div>
            <div className='product-item__buttons'>
                <Button
                    variant='primary'
                    onClick={() => nav(product.id)}
                >
                    Open
                </Button>
                <Button>
                    Buy
                </Button>
            </div>
        </div>
    );
};

export default ProductItem;