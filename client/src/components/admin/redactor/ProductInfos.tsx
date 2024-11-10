import React, {FC, useState} from 'react';
import Button from '@/components/UI/button/Button';
import FormInput from '@/components/admin/redactor/FormInput';
import {IInfoInput} from '@/models/info/IInfoInput';
import {IInfo} from '@/models/info/IInfo';
import {useInfosStore} from '@/store/useInfosStore';
import {IErrorData} from '@/models/error/IErrorData';
import {IError} from '@/models/error/IError';
import {AxiosError} from 'axios';
import {useFindInputError} from '@/hooks/useFindInputError';

interface ProductInfosProps {
    id: string;
    fetchProduct: (id: string) => void;
    infos: IInfo[];
    setInfos: (infos: IInfo[]) => void;
}

const ProductInfos: FC<ProductInfosProps> = props => {
    const [newInfo, setNewInfo] = useState<IInfoInput>(null);
    const [errors, setErrors] = useState<IError[]>(null);

    const {
        createInfo,
        updateInfo,
        deleteInfo
    } = useInfosStore();

    const inputError = useFindInputError(errors);

    const addInfo = () => {
        setNewInfo({title: '', body: '', productId: props.id});
    };

    const setNewInfoHandler = (info: IInfoInput, field: string) => {
        if (errors) {
            setErrors(errors.filter(error => error.path !== field));
        }
        setNewInfo(info);
    };

    const saveInfo = async () => {
        await createInfo(newInfo)
            .then(() => setNewInfo(null))
            .then(() => props.fetchProduct(props.id))
            .catch(err => {
                const errorData = (err as AxiosError<IErrorData>).response.data;
                setErrors(errorData.errors);
            })
    };

    const updateInfoItem = async (info: IInfo) => {
        await updateInfo(info)
            .then(() => props.fetchProduct(props.id))
            .catch(err => {
                const errorData = (err as AxiosError<IErrorData>).response.data;
                setErrors(errorData.errors?.map(err => ({msg: err.msg, path: `${err.path}_${info.id}`})));
            })
    };

    const setInfo = (value: string, field: string, info: IInfo) => {
        if (errors) {
            setErrors(errors.filter(error => error.path !== `${field}_${info.id}`));
        }
        const newInfos = props.infos.map(item => item.id !== info.id ? item : {
            ...info, [field]: value
        });
        props.setInfos(newInfos);
    };

    const deleteInfoItem = async (infoId: string) => {
        await deleteInfo(infoId).then(() => props.fetchProduct(props.id))
    };

    return (
        <div>
            {!!props.infos?.length &&
                props.infos.map(info =>
                    <div
                        key={info.id}
                        className='redactor-page__info'
                    >
                        <FormInput
                            value={info.title}
                            id={`${info.id}_t`}
                            onChange={v => setInfo(v, 'title', info)}
                            label='Title'
                            isInvalid={!!inputError(`title_${info.id}`)}
                            error={inputError(`title_${info.id}`)}
                        />
                        <FormInput
                            value={info.body}
                            id={`${info.id}_b`}
                            onChange={v => setInfo(v, 'body', info)}
                            label='Body'
                            isInvalid={!!inputError(`body_${info.id}`)}
                            error={inputError(`body_${info.id}`)}
                            className='redactor-page__body-label'
                        />
                        <div className='redactor-page__buttons'>
                            <Button onClick={() => deleteInfoItem(info.id)}>
                                Delete
                            </Button>
                            <Button
                                variant='primary'
                                onClick={() => updateInfoItem(info)}
                            >
                                Update
                            </Button>
                        </div>
                    </div>
                )
            }
            {newInfo &&
                <div>
                    <FormInput
                        value={newInfo?.title}
                        id='newTitle'
                        onChange={v => setNewInfoHandler({...newInfo, title: v}, 'title')}
                        label='Title'
                        isInvalid={!!inputError('title')}
                        error={inputError('title')}
                    />
                    <FormInput
                        value={newInfo?.body}
                        id='newBody'
                        onChange={v => setNewInfoHandler({...newInfo, body: v}, 'body')}
                        label='Body'
                        isInvalid={!!inputError('body')}
                        error={inputError('body')}
                    />
                    <Button
                        variant='primary'
                        className='redactor-page__save-button'
                        onClick={saveInfo}
                    >
                        Save info
                    </Button>
                </div>
            }
            {!newInfo &&
                <Button
                    variant='primary'
                    onClick={addInfo}
                >
                    Add info
                </Button>
            }
        </div>
    );
};

export default ProductInfos;