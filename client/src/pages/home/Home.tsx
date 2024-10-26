import React, {FC, useEffect} from 'react';
import './Home.css';
import {useFetchBrands} from '@/store/brands/useFetchBrands';
import Loader from '@/components/UI/loader/Loader';
import {useNavigate} from 'react-router-dom';
import {RouteNames} from '@/router';
import {useFetchProducts} from '@/store/products/useFetchProducts';
import {IProductQuery} from '@/models/product/IProductQuery';
import ProductItem from '@/components/productItem/ProductItem';
import Button from '@/components/UI/button/Button';

const Home: FC = () => {
    const {data: brands, isLoading: isBrandsLoading} = useFetchBrands();
    const fetchBrands = useFetchBrands(state => state.fetchBrands);

    const {data: products, isLoading: isProductsLoading} = useFetchProducts();
    const fetchProducts = useFetchProducts(state => state.fetchProducts);

    const navigate = useNavigate();
    const isLoading = isBrandsLoading || isProductsLoading;
    const popularProductsQuery: IProductQuery = {limit: 5, sort: 'rate_up'};

    const nav = (brandId: string) => {
        navigate(RouteNames.SHOP + `?brandId=${brandId}`)
    };
    const refetch = () => location.reload()

    useEffect(() => {
        fetchBrands();
        fetchProducts(popularProductsQuery);
    }, []);

    if (isLoading) {
        return <Loader/>
    }

    return (
        <div className='home-page header-margin'>
            {brands?.length &&
                <div className='home-page__brands'>
                    <h2 className='home-page__text home-page__brands-text'>Brands</h2>
                    <div className='home-page__brands-list'>
                        {brands.map(brand =>
                            <div
                                key={brand.id}
                                className='home-page__brands-list-item'
                                onClick={() => nav(brand.id)}
                            >
                                <img
                                    src={brand.image}
                                    alt={brand.name}
                                    className='home-page__brands-list-item-image'
                                />
                            </div>
                        )}
                    </div>
                </div>
            }
            {products?.count &&
                <div className="home-page__products">
                    <h2 className='home-page__text home-page__products-text'>Popular products</h2>
                    <div className='home-page__products-list'>
                        {products.data.map(product =>
                            <ProductItem product={product} key={product.id}/>
                        )}
                    </div>
                </div>
            }
            {!brands && !products &&
                <div className='center-container home-page__error'>
                    <h1>Looks like something went wrong</h1>
                    <Button
                        size='lg'
                        className='home-page__error-button'
                        onClick={refetch}
                    >
                        refetch
                    </Button>
                </div>
            }
        </div>
    );
};

export default Home;