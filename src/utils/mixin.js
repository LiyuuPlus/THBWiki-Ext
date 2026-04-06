import { getMessage } from '@/api/browser';

export const mixin = {
    methods: {
        /**
         * 获取翻译文本
         * @param {string} key - 翻译文本的键 
         * @returns {string} 对应的翻译文本
         */
        _t(key) {
            return getMessage(key);
        },
    },
};