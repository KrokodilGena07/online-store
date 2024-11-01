import React, {FC, useState} from 'react';
import Input from '@/components/UI/input/Input';
import Button from '@/components/UI/button/Button';
import {useCategoriesStore} from '@/store/categories/useCategoriesStore';

interface AdminModelProps {
    mutationHandler: (...args: any) => Promise<void>;
}

const AdminModel: FC<AdminModelProps> = ({mutationHandler}) => {
    const [name, setName] = useState('');

    const {
        isLoading: isCategoryLoading,
        error: categoryError
    } = useCategoriesStore();

    const mutation = async () => {
        console.log(mutationHandler)
        await mutationHandler(name).then(data => {
            console.log(data);
        })
    };

    console.log(isCategoryLoading, categoryError);

    return (
        <div className='admin-page__modal center-container'>
            <Input
                value={name}
                onChange={setName}
                size='lg'
                placeholder='Name'
            />
            <Button
                variant='primary'
                className='admin-page__modal-button'
                onClick={mutation}
            >
                Save
            </Button>
        </div>
    );
};

export default AdminModel;