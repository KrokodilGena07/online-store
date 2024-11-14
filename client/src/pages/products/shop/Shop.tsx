import React, {FC, useEffect, useState} from 'react';
import './Shop.css';
import Dropdown from '@/components/UI/dropdown/Dropdown';
import {useFetchBrands} from '@/store/brands/useFetchBrands';
import Loader from '@/components/UI/loader/Loader';
import {useFetchCategories} from '@/store/categories/useFetchCategories';
import {useFetchProducts} from '@/store/products/useFetchProducts';
import {useLocation} from 'react-router-dom';
import ProductItem from '@/components/productItem/ProductItem';
import Pagination from '@/components/UI/pagination/Pagination';
import {sorts} from '@/utils/sorts';
import {limits} from '@/utils/limits';

const Shop: FC = () => {
    const location = useLocation();
    const [search, setSearch] = useState('');

    const searchQuery = location.search.split('search=')[1];
    const brandId = location.search.split('brandId=')[1];

    useEffect(() => {
        if (search) {
            setSearch(searchQuery);
            setBrand(null);
            setCategory(null);
            setSort('default');
            setLimit(null);
            setPage(1);
        }
        if (brandId) {
            setBrand(brandId);
        }
        fetchProducts({search: searchQuery, brandId});
    }, [location.search]);

    const [page, setPage] = useState(1);
    const [sort, setSort] = useState('default');
    const [limit, setLimit] = useState(null);
    const [brand, setBrand] = useState(null);
    const [category, setCategory] = useState(null);

    const {isLoading: isBrandLoading, data: brands} = useFetchBrands();
    const fetchBrands = useFetchBrands(state => state.fetchBrands);

    const {isLoading: isCategoryLoading, data: categories} = useFetchCategories();
    const fetchCategories = useFetchCategories(state => state.fetchCategories);

    const {data: products, isLoading: isProductsLoading} = useFetchProducts();
    const fetchProducts = useFetchProducts(state => state.fetchProducts);

    const pagesCount = Math.ceil(products?.count / (limit || 10)) || 0;
    const pagesArray = Array.from(Array(pagesCount).keys());
    const isLoading = isBrandLoading || isCategoryLoading || isProductsLoading;

    useEffect(() => {
        fetchBrands();
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchProducts({
            brandId: brand || brandId,
            categoryId: category,
            search: search || searchQuery,
            limit,
            page,
            sort
        });
    }, [brand, category, search, limit, page, sort]);

    if (isLoading) {
        return <Loader/>;
    }

    return (
        <div className='page shop-page'>
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
            {!!products?.count &&
                <div className='shop-page__products'>
                    {products?.data.map(product =>
                        <ProductItem
                            product={product}
                            key={product.id}
                        />
                    )}
                </div>
            }
            <Pagination
                page={page}
                setPage={setPage}
                pages={pagesArray}
            />
            {!products?.count &&
                <div className='shop-page__error-text center-container'>
                    <p>Products not found</p>
                </div>
            }
        </div>
    );
};

export default Shop;