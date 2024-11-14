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
    setSelectedBrand: (v: IBrand) => void;
    setSelectedCategory: (v: ICategory) => void;
}

const AdminModel: FC<AdminModelProps> = props => {
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

    const doMutation = (mutation: (data: any) => Promise<void>, data: any) => {
        return async () => {
            await mutation(data)
                .then(props.callback)
                .catch(err => {
                    const errorData = (err as AxiosError<IErrorData>).response.data;
                    setError(errorData.message);
                });
        };
    };

    switch (props.mutationName) {
        case 'create_category':
            mutation = doMutation(createCategory, name)
            break;
        case 'update_category':
            mutation = doMutation(updateCategory, {...props.category, name});
            break;
        case 'create_brand':
            mutation = doMutation(createBrand, {name, image});
            break;
        case 'update_brand':
            mutation = doMutation(updateBrand, {...props.brand, image, name});
            break;
    }

    const isBrandMutation =
        props.mutationName === 'create_brand' ||
        props.mutationName === 'update_brand';

    const isNewItem =
        props.mutationName === 'create_brand' ||
        props.mutationName === 'create_category';

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        setError(null);
        e.preventDefault();
        await mutation().then(() => {
            if (isBrandMutation) {
                props.setSelectedBrand(null);
            } else {
                props.setSelectedCategory(null);
            }
        })
    };

    const isLoading = isCategoryLoading || isBrandLoading;
    const buttonText = isNewItem ? 'Create' : 'Save';

    useEffect(() => {
        if (!isNewItem) {
            if (props.category) {
                setName(props.category.name);
                return;
            }
            if (props.brand) {
                setName(props.brand.name);
                const image = convertBase64ToFile(props.brand.image, 'brand.png');
                setImage(image);
            }
        }
    }, [props.category, props.brand]);

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
                            className='input__none'
                            onChange={v => setImage(v.target.files[0])}
                        />
                        <label htmlFor='file'>
                            <div className='file-input'>
                                {image?.name || 'select file'}
                            </div>
                        </label>
                    </>
                }
                {error &&
                    <p className='admin-page__modal-error'>{error}</p>
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