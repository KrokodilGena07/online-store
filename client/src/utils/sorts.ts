import {IDropdownItem} from '@/models/UI/IDropdownItem';

export const sorts: IDropdownItem[] = [
    {value: 'default', title: 'no sort'},
    {value: 'rate_up', title: 'rating ascending'},
    {value: 'rate_down', title: 'rating descending'},
    {value: 'price_up', title: 'price ascending'},
    {value: 'price_down', title: 'price descending'}
];