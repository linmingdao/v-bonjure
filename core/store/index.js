import Vuex from 'vuex';
import Vue from 'vue';

// 使用Vuex统一管理应用状态
Vue.use(Vuex);

/**
 * 导出应用的状态树配置函数，应用状态树(store)包含：
 * 1、state(状态树，这个是分模块的，每个模块对应自己的状态树)
 * 2、mutations(t同步)
 * 3、actions(异步)
 * @param {*} appStore 
 */
export const configAppStore = (appStore) => new Vuex.Store({
    modules: {
        ...appStore
    }
});