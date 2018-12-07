import Vue from 'vue';

// LoadingBox 是基于 ElementUI 的，获取 ElementUI $loading服务
const $loading = Vue.prototype.$loading;

// 默认配置
const DEFAULT_OPTION = {
    lock: true,
    text: '数据加载中',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
};

export default class LoadingBox {

    constructor(opt = DEFAULT_OPTION) {
        this.opt = opt;
        this.loading = null;
    }

    showLoading() {
        this.loading = $loading(this.opt);
        return this;
    }

    hideLoading() {
        this.loading && this.loading.close();
        return this;
    }

    config(opt = DEFAULT_OPTION) {
        this.opt = opt;
        return this;
    }

    static getInstance(opt) {
        return new LoadingBox(opt);
    }

}