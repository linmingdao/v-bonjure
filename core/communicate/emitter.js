import Vue from 'vue';
import Logger from '@core/logger';

const logger = Logger.getLogger('global/emitter');

function broadcast(componentName, eventName, params) {
    this.$children.forEach(child => {
        const name = child.$options.name;
        if (name === componentName) {
            child.$emit.apply(child, [eventName].concat(params));
        } else {
            broadcast.apply(child, [componentName, eventName].concat([params]));
        }
    });
}

export function enableEmitter() {
    logger.info('启用组件发射器');

    /**
     * 分发事件
     * @param {String} componentName
     * @param {String} eventName
     * @param {*} params
     */
    Vue.prototype.$dispatch = function(componentName, eventName, params) {
        let parent = this.$parent || this.$root;
        let name = parent.$options.name;

        while (parent && (!name || name !== componentName)) {
            parent = parent.$parent;
            if (parent) {
                name = parent.$options.name;
            }
        }

        if (parent) {
            parent.$emit.apply(parent, [eventName].concat(params));
        }
    };

    /**
     * 广播事件
     * @param {String} componentName
     * @param {String} eventName
     * @param {*} params
     */
    Vue.prototype.$broadcast = function(componentName, eventName, params) {
        broadcast.call(this, componentName, eventName, params);
    };
}
