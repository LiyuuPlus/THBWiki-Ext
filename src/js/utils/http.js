import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui';

export default {
    get(url, params) {
        return new Promise((res, rej) => {
            axios.get(url, {
                params: params
            }).then((ret) => {
                res(ret.data)
            }).catch((ex) => {
                Message.error('访问出现错误');
                rej(ex);
            });
        });
    },
    post(url, data, isJson) {
        return new Promise((res, rej) => {
            axios.post(url, {
                data: isJson ? data : qs.stringify(data)
            }).then((ret) => {
                res(ret.data)
            }).catch((ex) => {
                Message.error('发送请求出现错误');
                rej(ex);
            });
        });
    }
}