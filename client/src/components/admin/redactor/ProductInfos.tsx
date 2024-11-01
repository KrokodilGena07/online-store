import React, {FC, useState} from 'react';
import Button from '@/components/UI/button/Button';
import FormInput from '@/components/admin/redactor/FormInput';
import {IInfoInput} from '@/models/info/IInfoInput';
import {IInfo} from '@/models/info/IInfo';
import {useInfosStore} from '@/store/useInfosStore';

interface ProductInfosProps {
    id: string;
    fetchProduct: (id: string) => void;
    infos: IInfo[];
    setInfos: (infos: IInfo[]) => void;
}

const ProductInfos: FC<ProductInfosProps> = props => {
    const [newInfo, setNewInfo] = useState<IInfoInput>(null);

    const {
        createInfo,
        updateInfo,
        deleteInfo
    } = useInfosStore();

    const addInfo = () => {
        setNewInfo({title: '', body: '', productId: props.id});
    };

    const saveInfo = async () => {
        await createInfo(newInfo)
            .then(() => setNewInfo(null))
            .then(() => props.fetchProduct(props.id))
    };

    const updateInfoItem = async (info: IInfo) => {
        await updateInfo(info).then(() => props.fetchProduct(props.id))
    };

    const setInfo = (value: string, field: string, info: IInfo) => {
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
                        />
                        <FormInput
                            value={info.body}
                            id={`${info.id}_b`}
                            onChange={v => setInfo(v, 'body', info)}
                            label='Body'
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
                        onChange={v => setNewInfo({...newInfo, title: v})}
                        label='Title'
                    />
                    <FormInput
                        value={newInfo?.body}
                        id='newBody'
                        onChange={v => setNewInfo({...newInfo, body: v})}
                        label='Body'
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