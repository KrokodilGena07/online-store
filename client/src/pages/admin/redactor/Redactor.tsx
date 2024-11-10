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
import {AxiosError} from 'axios';
import {IError} from '@/models/error/IError';
import {useFindInputError} from '@/hooks/useFindInputError';
import {useNavigate} from 'react-router-dom';
import {RouteNames} from '@/router';

const Redactor: FC = () => {
    const locationArray = location.pathname.split('/');
    const id = locationArray[locationArray.length - 1];

    const navBack = useNavBack();
    const navigate = useNavigate();

    const {data: product, isLoading: isProductLoading} = useFetchProduct();
    const fetchProduct = useFetchProduct(state => state.fetchProduct);

    const {data: brands, isLoading: isBrandsLoading} = useFetchBrands();
    const fetchBrands = useFetchBrands(state => state.fetchBrands);

    const [errors, setErrors] = useState<IError[]>(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const inputError = useFindInputError(errors);

    const newProductHandler = (value: string, field: string) => {
        if (errors) {
            setErrors(errors.filter(error => error.path !== field));
        }
        setNewProduct({...newProduct, [field]: value});
    };

    const {
        createProduct,
        updateProduct,
        deleteProduct,
        isLoading: isProductMutationLoading
    } = useProductsStore();

    const setError = (err: any) => {
        const errorData = (err as AxiosError<IErrorData>).response.data;
        if (errorData.errors) {
            setErrors(errorData.errors);
        }
        setErrorMessage(errorData.message);
    }

    const createProductHandler = async () => {
        setErrors(null);
        setErrorMessage(null);
        await createProduct({
            ...newProduct, brandId, categoryId, image})
            .then(() => {
                navBack();
            })
            .catch(err => setError(err));
    };

    const updateProductHandler = async () => {
        setErrors(null);
        setErrorMessage(null);
        await updateProduct({...newProduct, brandId, categoryId, image})
            .then(() => fetchProduct(id))
            .catch(err => setError(err));
    };

    const deleteProductHandler = async () => {
        deleteProduct(id);
        navigate(RouteNames.PROFILE);
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
                name: '', price: '', description: ''
            } as IProductInput);
        }
    }, [product]);

    const isLoading = isProductLoading || isBrandsLoading || isCategoriesLoading;

    if (isLoading) {
        return <Loader/>;
    }

    return (
        <div className='page redactor-page'>
            <h2 className='font'>Product body</h2>
            <FormInput
                value={newProduct?.name}
                id='name'
                onChange={v => newProductHandler(v, 'name')}
                label='Name'
                className='redactor-page__product-label'
                isInvalid={!!inputError('name')}
                error={inputError('name')}
            />
            <label
                htmlFor='description'
                className='font redactor-page__label redactor-page__product-label'
            >
                Description
            </label>
            <textarea
                id='description'
                className={`input ${inputError('description') && 'input_invalid'} redactor-page__textarea`}
                wrap='hard'
                cols={60}
                rows={10}
                value={newProduct?.description}
                onChange={v => newProductHandler(v.target.value, 'description')}
            />
            {inputError('description') &&
                <div className='input-error-text font'>{inputError('description').msg}</div>
            }
            <FormInput
                value={newProduct?.price}
                id='price'
                onChange={v => newProductHandler(v, 'price')}
                label='Price'
                className='redactor-page__product-label'
                isInvalid={!!inputError('price')}
                error={inputError('price')}
            />
            <p className='redactor-page__label redactor-page__product-label font'>Brands</p>
            <Dropdown
                value={brandId}
                onChange={setBrandId}
                options={brands?.map(item => ({title: item.name, value: item.id}))}
                variant='primary'
                defaultValue='select brand'
            />
            {inputError('brandId') &&
                <div className='input-error-text font'>{inputError('brandId')?.msg}</div>
            }
            <p className='redactor-page__label font redactor-page__product-label'>Categories</p>
            <Dropdown
                value={categoryId}
                onChange={setCategoryId}
                options={categories?.map(item => ({title: item.name, value: item.id}))}
                variant='default'
                defaultValue='select category'
            />
            {inputError('categoryId') &&
                <div className='input-error-text font'>{inputError('categoryId')?.msg}</div>
            }
            <input
                type="file"
                id='file'
                className='redactor-page__none'
                onChange={v => setImage(v.target.files[0])}
            />
            <p className='redactor-page__label font redactor-page__product-label'>Image</p>
            <label htmlFor='file'>
                <div className='redactor-page__file-input font'>
                    {image?.name || 'select file'}
                </div>
            </label>
            {(!errors && errorMessage) &&
                <p className='font redactor-page__error'>{errorMessage}</p>
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
                        onClick={updateProductHandler}
                    >
                        {isProductMutationLoading ?
                            'loading...'
                            :
                            'Save'
                        }
                    </Button>
                    <Button
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