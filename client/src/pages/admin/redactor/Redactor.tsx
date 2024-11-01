import React, {FC, useEffect, useState} from 'react';
import './Redactor.css';
import {useFetchProduct} from '@/store/products/useFetchProduct';
import Loader from '@/components/UI/loader/Loader';
import {IInfo} from '@/models/info/IInfo';
import ProductInfos from '@/components/admin/redactor/ProductInfos';
import FormInput from '@/components/admin/redactor/FormInput';
import Dropdown from '@/components/UI/dropdown/Dropdown';
import {useFetchBrands} from '@/store/brands/useFetchBrands';
import {useFetchCategories} from '@/store/categories/useFetchCategories';
import Button from '@/components/UI/button/Button';
import {useProductsStore} from '@/store/products/useProductsStore';
import {useNavBack} from '@/hooks/useNavBack';
import {convertBase64ToFile} from '@/utils/convertBase64ToFile';
import {IErrorData} from '@/models/error/IErrorData';
import {IProductInput} from '@/models/product/IProductInput';

const Redactor: FC = () => {
    const locationArray = location.pathname.split('/');
    const id = locationArray[locationArray.length - 1];

    const navBack = useNavBack();

    const {data: product, isLoading: isProductLoading} = useFetchProduct();
    const fetchProduct = useFetchProduct(state => state.fetchProduct);

    const {data: brands, isLoading: isBrandsLoading} = useFetchBrands();
    const fetchBrands = useFetchBrands(state => state.fetchBrands);

    const [errorData, setErrorData] = useState<IErrorData>(null);

    const {
        createProduct,
        updateProduct,
        deleteProduct,
        error,
        isLoading: isProductMutationLoading
    } = useProductsStore();

    const createProductHandler = async () => {
        await createProduct({
            ...newProduct,
            brandId,
            categoryId,
            image
        }).then(() => {
            if (!error) {
                navBack();
            }
            setErrorData(error);
        })
    };

    const updateProductHandler = async () => {
        await updateProduct({
            ...product,
            brandId,
            categoryId,
            image,
            price: String(product.price)
        }).then(() => fetchProduct(id));
    };

    const deleteProductHandler = async () => {
        deleteProduct(id);
        navBack();
    };

    const {data: categories, isLoading: isCategoriesLoading} = useFetchCategories();
    const fetchCategories = useFetchCategories(state => state.fetchCategories);

    const [newProduct, setNewProduct] = useState<IProductInput>(null);
    const [infos, setInfos] = useState<IInfo[]>(null);

    const [brandId, setBrandId] = useState(null);
    const [categoryId, setCategoryId] = useState(null);

    const [image, setImage] = useState<File>(null);

    useEffect(() => {
        fetchProduct(id);
        fetchBrands();
        fetchCategories();
    }, []);
    useEffect(() => {
        if (product) {
            const file = convertBase64ToFile(product.image, 'image.png');
            setImage(file);
            setNewProduct({
                ...product,
                image: file,
                price: String(product.price)
            });
            setInfos(product.infos);
            setBrandId(product.brandId);
            setCategoryId(product.categoryId);
        }
        if (!product && !isProductLoading) {
            setNewProduct({
                name: '', price: ''
            } as IProductInput);
        }
    }, [product]);

    const isLoading = isProductLoading || isBrandsLoading || isCategoriesLoading;

    if (isLoading) {
        return <Loader/>;
    }

    console.log(newProduct);

    return (
        <div className='page redactor-page'>
            <h2 className='font redactor-page-margin'>Product body</h2>
            <FormInput
                value={newProduct?.name}
                id='name'
                onChange={v => setNewProduct({...newProduct, name: v})}
                label='Name'
            />
            <label
                htmlFor='description'
                className='font redactor-page__label'
            >
                Description
            </label>
            <textarea
                id='description'
                className='input redactor-page__textarea'
                wrap='hard'
                cols={60}
                rows={10}
                value={newProduct?.description}
                onChange={v => setNewProduct({
                    ...newProduct, description: v.target.value}
                )}
            />
            <FormInput
                value={newProduct?.price}
                id='price'
                onChange={v => setNewProduct({...newProduct, price: v})}
                label='Price'
            />
            <p className='redactor-page__label font'>Brands</p>
            <Dropdown
                value={brandId}
                onChange={setBrandId}
                options={brands?.map(item => ({title: item.name, value: item.id}))}
                variant='primary'
                className='redactor-page__input'
            />
            <p className='redactor-page__label font'>Categories</p>
            <Dropdown
                value={categoryId}
                onChange={setCategoryId}
                options={categories?.map(item => ({title: item.name, value: item.id}))}
                variant='default'
                className='redactor-page__input'
            />
            <input
                type="file"
                id='file'
                className='redactor-page__none'
                onChange={v => setImage(v.target.files[0])}
            />
            <p className='redactor-page__label font'>Image</p>
            <label htmlFor='file'>
                <div className='redactor-page__file-input font'>
                    {image?.name || 'select file'}
                </div>
            </label>
            {!errorData?.errors.length && errorData?.message &&
                <p>123</p>
            }
            {!product &&
                <Button
                    variant='primary'
                    className='redactor-page__save-product-button'
                    onClick={createProductHandler}
                >
                    {isProductMutationLoading ?
                        'loading...'
                        :
                        'Create'
                    }
                </Button>
            }
            {product &&
                <div className='redactor-page__buttons'>
                    <Button
                        variant='primary'
                        className='redactor-page__save-product-button'
                        onClick={updateProductHandler}
                    >
                        {isProductMutationLoading ?
                            'loading...'
                            :
                            'Save'
                        }
                    </Button>
                    <Button
                        className='redactor-page__save-product-button'
                        onClick={deleteProductHandler}
                    >
                        {isProductMutationLoading ?
                            'loading...'
                            :
                            'Delete'
                        }
                    </Button>
                </div>
            }
            {product &&
                <h2 className='font redactor-page-margin'>Product infos</h2>
            }
            {product &&
                <ProductInfos
                    id={id}
                    fetchProduct={fetchProduct}
                    infos={infos}
                    setInfos={setInfos}
                />
            }
        </div>
    );
};

export default Redactor;