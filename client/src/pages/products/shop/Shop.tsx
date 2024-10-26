import React, {FC, useEffect, useState} from 'react';
import './Shop.css';
import Dropdown from '@/components/UI/dropdown/Dropdown';
import {IDropdownItem} from '@/models/UI/IDropdownItem';
import {useFetchBrands} from '@/store/brands/useFetchBrands';
import Loader from '@/components/UI/loader/Loader';
import {useFetchCategories} from '@/store/categories/useFetchCategories';
import {useFetchProducts} from '@/store/products/useFetchProducts';
import {useLocation} from 'react-router-dom';

const Shop: FC = () => {
    const location = useLocation();
    const [search, setSearch] = useState('');

    useEffect(() => {
        setSearch(location.search.split('=')[1]);
    }, [location.search]);

    const [page, setPage] = useState(1);

    const [sort, setSort] = useState('default');
    const sorts: IDropdownItem[] = [
        {value: 'default', title: 'no sort'},
        {value: 'rate_up', title: 'rating ascending'},
        {value: 'rate_down', title: 'rating descending'},
        {value: 'price_up', title: 'price ascending'},
        {value: 'price_down', title: 'price descending'}
    ];

    const [limit, setLimit] = useState(null);
    const limits: IDropdownItem[] = [
        {value: 5, title: '5 products'},
        {value: 10, title: '10 products'},
        {value: 20, title: '20 products'},
        {value: 50, title: '50 products'}
    ];

    const [brand, setBrand] = useState(null);
    const {isLoading: isBrandLoading, data: brands} = useFetchBrands();
    const fetchBrands = useFetchBrands(state => state.fetchBrands);

    const [category, setCategory] = useState(null);
    const {isLoading: isCategoryLoading, data: categories} = useFetchCategories();
    const fetchCategories = useFetchCategories(state => state.fetchCategories);

    const {data: products, isLoading: isProductsLoading, error} = useFetchProducts();
    const fetchProducts = useFetchProducts(state => state.fetchProducts);

    const isLoading = isBrandLoading || isCategoryLoading || isProductsLoading;

    useEffect(() => {
        fetchBrands();
        fetchCategories();
        fetchProducts({search});
    }, []);
    useEffect(() => {
        fetchProducts({brandId: brand, categoryId: category, search, limit, page, sort});
    }, [brand, category, search, limit, page, sort]);

    if (isLoading) {
        return <Loader/>;
    }

    console.log(products);

    return (
        <div className='shop-page'>
            <div className='shop-page__filter'>
                <Dropdown
                    value={brand}
                    onChange={setBrand}
                    options={brands?.map(brand => ({value: brand.id, title: brand.name}))}
                    defaultValue='choose brand'
                    variant='primary'
                />
                <Dropdown
                    value={category}
                    onChange={setCategory}
                    options={categories?.map(category => ({value: category.id, title: category.name}))}
                    defaultValue='choose category'
                    variant='primary'
                />
                <Dropdown
                    value={sort}
                    onChange={setSort}
                    options={sorts}
                    className='shop-page__filter-sort'
                />
                <Dropdown
                    value={limit}
                    onChange={setLimit}
                    options={limits}
                    defaultValue='set limit'
                />
            </div>
            <div>
                {products?.data.map(product =>
                    <div
                        key={product.id}
                        className='product-item'
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className='product-item__img'
                        />
                        <h2>{product.name}</h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shop;