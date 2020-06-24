import Vue from 'vue';
import Logger from '@core/logger';

const logger = Logger.getLogger('global/findComponents');

export function enableFindComponents() {
    logger.info('启用组件间的发现能力');

    /**
     * 由一个组件，找到最近的指定父组件
     * @param {String} componentName 组件名字
     * @param {Object} context 搜索的上下文对象（不指定默认是调用该方法的当前组件）
     */
    Vue.prototype.$findParentComponent = function(componentName, context) {
        const ctx = context || this;

        let parent = ctx.$parent;
        let name = parent.$options.name;

        while (parent && (!name || ![componentName].includes(name))) {
            parent = parent.$parent;
            parent && (name = parent.$options.name);
        }

        // 返回结果的时候再次做一下判断，防止最后一次也没找到
        return [componentName].includes(name) ? parent : undefined;
    };

    /**
     * 由一个组件，找到所有的指定父组件
     * @param {String} componentName 组件名字
     * @param {Object} context 搜索的上下文对象（不指定默认是调用该方法的当前组件）
     */
    Vue.prototype.$findParentComponents = function(componentName, context) {
        const ctx = context || this;

        let parents = [];
        const parent = ctx.$parent;

        if (parent) {
            if (parent.$options.name === componentName) parents.push(parent);
            return parents.concat(parent.$findParentComponents(componentName));
        } else {
            return [];
        }
    };

    /**
     * 由一个组件，找到最近的子组件
     * @param {String} componentName 组件名字
     * @param {Object} context 搜索的上下文对象（不指定默认是调用该方法的当前组件）
     */
    Vue.prototype.$findChildComponent = function(componentName, context) {
        const ctx = context || this;

        const childrens = ctx.$children;
        let children = null;

        if (childrens.length) {
            for (const child of childrens) {
                const name = child.$options.name;
                if (name === componentName) {
                    children = child;
                    break;
                } else {
                    children = child.$findChildComponent(componentName);
                    if (children) break;
                }
            }
        }

        return children;
    };

    /**
     * 由一个组件，找到所有指定的子组件
     * @param {String} componentName 组件名字
     * @param {Object} context 搜索的上下文对象（不指定默认是调用该方法的当前组件）
     */
    Vue.prototype.$findChildComponents = function(componentName, context) {
        const ctx = context || this;

        return ctx.$children.reduce((components, child) => {
            child.$options.name === componentName && components.push(child);
            const foundChilds = child.$findChildComponents(componentName);
            return components.concat(foundChilds);
        }, []);
    };

    /**
     * 由一个组件，找到指定组件的兄弟组件
     * @param {String} componentName 组件名字
     * @param {Object} context 搜索的上下文对象（不指定默认是调用该方法的当前组件）
     */
    Vue.prototype.$findSiblingComponents = function(componentName, context, exceptMe = true) {
        const ctx = context || this;

        let res = ctx.$parent.$children.filter(item => item.$options.name === componentName);
        let index = res.findIndex(item => item._uid === ctx._uid);
        exceptMe && res.splice(index, 1);

        return res;
    };
}
