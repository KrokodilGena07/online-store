import {useUserStore} from '@/store/user/useUserStore';
import axios from 'axios';
import {IInfo} from '@/models/info/IInfo';
import {IInfoInput} from '@/models/info/IInfoInput';
import {IInfoUpdateInput} from '@/models/info/IInfoUpdateInput';

export class InfosApi {
    static BASE_URL = `${__API__}/infos`;
    static ACCESS_TOKEN = useUserStore.getState().accessToken;
    static HEADERS = {
        authorization: `Bearer ${this.ACCESS_TOKEN}`
    };

    static async createInfo(data: IInfoInput): Promise<IInfo> {
        return await axios.post(this.BASE_URL, data, {
            headers: this.HEADERS
        }).then(response => response.data);
    }

    static async updateInfo(data: IInfoUpdateInput): Promise<IInfo> {
        return await axios.put(this.BASE_URL, data, {
            headers: this.HEADERS
        }).then(response => response.data);
    }

    static async deleteInfo(id: string): Promise<void> {
        await axios.delete(`${this.BASE_URL}/${id}`, {
            headers: this.HEADERS
        });
    }
}