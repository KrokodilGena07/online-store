import React, {FC, useEffect, useState} from 'react';
import './Panel.css';
import {useFetchBrands} from '@/store/brands/useFetchBrands';
import {useFetchCategories} from '@/store/categories/useFetchCategories';
import Loader from '@/components/UI/loader/Loader';
import Button from '@/components/UI/button/Button';
import {IBrand} from '@/models/brand/IBrand';
import {ICategory} from '@/models/ICategory';
import {useBrandsStore} from '@/store/brands/useBrandsStore';
import {useCategoriesStore} from '@/store/categories/useCategoriesStore';
import AdminModel from '@/components/admin/adminModal/AdminModel';
import Modal from '@/components/UI/modal/Modal';

const Panel: FC = () => {
    const {data: brands, isLoading: isBrandsLoading} = useFetchBrands();
    const {data: categories, isLoading: isCategoriesLoading} = useFetchCategories();

    const fetchBrands = useFetchBrands(state => state.fetchBrands);
    const fetchCategories = useFetchCategories(state => state.fetchCategories);

    const [selectedBrand, setSelectedBrand] = useState<IBrand>(null);
    const [selectedCategory, setSelectedCategory] = useState<ICategory>(null);

    const {
        createBrand,
        updateBrand,
        deleteBrand,
        isLoading: isBrandMutationLoading,
        error: brandError
    } = useBrandsStore();

    const {
        createCategory,
        updateCategory,
        deleteCategory,
        isLoading: isCategoryMutationLoading,
        error: categoryError
    } = useCategoriesStore();

    const [mutationHandler, setMutationHandler] = useState(null);

    const createCategoryHandler = () => {
        setIsVisible(true);
        setMutationHandler(createCategory);
    };

    const deleteBrandHandler = async () => {
        await deleteBrand(selectedBrand.id)
            .then(() => fetchBrands())
            .then(() => setSelectedBrand(null));
    };

    const deleteCategoryHandler = async () => {
        await deleteCategory(selectedCategory.id)
            .then(() => fetchCategories())
            .then(() => setSelectedCategory(null));
    };

    useEffect(() => {
        fetchCategories();
        fetchBrands();
    }, []);

    const isLoading = isBrandsLoading || isCategoriesLoading;

    const [isVisible, setIsVisible] = useState(false);

    if (isLoading) {
        return <Loader/>;
    }

    return (
        <div className='page'>
            <Modal
                isVisible={isVisible}
                setIsVisible={setIsVisible}
            >
                <AdminModel mutationHandler={mutationHandler}/>
            </Modal>
            <h1 className='font'>Admin</h1>
            <h2 className='font admin-page__text'>Brands</h2>
            <div className='admin-page__items'>
                {brands?.map(brand =>
                    <div
                        key={brand.id}
                        className={`font admin-page__item ${selectedBrand?.id === brand.id && 'admin-page__item_selected'}`}
                        onClick={() => setSelectedBrand(brand)}
                    >
                        {brand.name}
                    </div>
                )}
            </div>
            {!brands?.length &&
                <p className='font admin-page__no-items-text'>Create new brand</p>
            }
            <div className='admin-page__buttons'>
                <Button
                    variant='primary'
                >
                    Create
                </Button>
                <Button
                    disabled={!selectedBrand}
                >
                    Update
                </Button>
                <Button
                    disabled={!selectedBrand}
                    onClick={deleteBrandHandler}
                >
                    Delete
                </Button>
            </div>
            <h2 className='font admin-page__text'>Categories</h2>
            <div className='admin-page__items'>
                {categories?.map(category =>
                    <div
                        key={category.id}
                        className={`font admin-page__item ${selectedCategory?.id === category.id && 'admin-page__item_selected'}`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category.name}
                    </div>
                )}
            </div>
            {!categories?.length &&
                <p className='font admin-page__no-items-text'>Create new category</p>
            }
            <div className='admin-page__buttons'>
                <Button
                    variant='primary'
                    onClick={createCategoryHandler}
                >
                    Create
                </Button>
                <Button
                    disabled={!selectedCategory}
                >
                    Update
                </Button>
                <Button
                    disabled={!selectedCategory}
                    onClick={deleteCategoryHandler}
                >
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default Panel;