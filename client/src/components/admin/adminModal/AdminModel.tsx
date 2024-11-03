import React, {FC, useEffect, useState} from 'react';
import Input from '@/components/UI/input/Input';
import Button from '@/components/UI/button/Button';
import {useCategoriesStore} from '@/store/categories/useCategoriesStore';
import {ICategory} from '@/models/ICategory';
import {useBrandsStore} from '@/store/brands/useBrandsStore';
import {IBrand} from '@/models/brand/IBrand';
import {AxiosError} from 'axios';
import {IErrorData} from '@/models/error/IErrorData';
import {convertBase64ToFile} from '@/utils/convertBase64ToFile';

interface AdminModelProps {
    mutationName: string;
    category?: ICategory;
    brand?: IBrand;
    callback: () => void;
}

const AdminModel: FC<AdminModelProps> = ({mutationName, category, brand, callback}) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState<File>(null);
    const [error, setError] = useState(null);
    let mutation: (...args: any) => Promise<void> = null;

    const {
        createCategory,
        updateCategory,
        isLoading: isCategoryLoading,
    } = useCategoriesStore();

    const {
        createBrand,
        updateBrand,
        isLoading: isBrandLoading,
    } = useBrandsStore();

    const caughtError = (error: any) => {
        const errorData = (error as AxiosError<IErrorData>).response.data;
        setError(errorData.message);
    };

    switch (mutationName) {
        case 'create_category':
            mutation = async () => {
                await createCategory(name)
                    .then(callback)
                    .catch(err => caughtError(err));
            };
            break;
        case 'update_category':
            mutation = async () => {
                await updateCategory({...category, name})
                    .then(callback)
                    .catch(err => caughtError(err));
            };
            break;
        case 'create_brand':
            mutation = async () => {
                await createBrand({name, image})
                    .then(callback)
                    .catch(err => caughtError(err));
            };
            break;
        case 'update_brand':
            mutation = async () => {
                await updateBrand({...brand, image, name})
                    .then(callback)
                    .catch(err => caughtError(err));
            };
            break;
    }

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        setError(null);
        e.preventDefault();
        await mutation();
    };

    const isBrandMutation =
        mutationName === 'create_brand' ||
        mutationName === 'update_brand';

    const isNewItem =
        mutationName === 'create_brand' ||
        mutationName === 'create_category';

    const isLoading = isCategoryLoading || isBrandLoading;
    const buttonText = isNewItem ? 'Create' : 'Save';

    useEffect(() => {
        if (!isNewItem) {
            if (category) {
                setName(category.name);
                return;
            }
            if (brand) {
                setName(brand.name);
                const image = convertBase64ToFile(brand.image, 'brand.png');
                setImage(image);
            }
        }
    }, [category]);

    return (
        <form
            className='admin-page__modal'
            onSubmit={e => submit(e)}
        >
            <div className='center-container admin-page__modal-section'>
                <Input
                    value={name}
                    onChange={setName}
                    size='lg'
                    placeholder='Name'
                />
                {isBrandMutation &&
                    <>
                        <input
                            type="file"
                            id='file'
                            className='admin-page__none'
                            onChange={v => setImage(v.target.files[0])}
                        />
                        <label htmlFor='file'>
                            <div className='admin-page__file-input font'>
                                {image?.name || 'select file'}
                            </div>
                        </label>
                    </>
                }
                {error &&
                    <p className='font admin-page__modal-error'>{error}</p>
                }
            </div>
            <div>
                <Button
                    variant='primary'
                    onClick={mutation}
                >
                    {isLoading ? 'Loading...' : buttonText}
                </Button>
            </div>
        </form>
    );
};

export default AdminModel;