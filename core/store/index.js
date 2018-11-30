import Vuex from 'vuex';
import Vue from 'vue';
import globalStore from './globalStore';

// 使用Vuex统一管理应用状态
Vue.use(Vuex);

/**
 * 导出应用的状态树配置函数，应用状态树(store)，与视图层一样是划分模块的，每个模块对应自己的状态树，应用状态树包含：
 * 1、state
 * 2、getters(衍生出的state)
 * 3、mutations(处理同步流状态数据)
 * 4、actions(处理异步流状态数据)
 * @param {*} appStore 
 */
export const configAppStore = appStore => new Vuex.Store({
    // 全局状态
    ...globalStore,
    // 应用各个模块的状态
    modules: {
        ...appStore
    }
});