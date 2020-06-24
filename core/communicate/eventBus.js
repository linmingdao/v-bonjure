import Vue from 'vue';
import utils from '@utils';
import Logger from '@core/logger';

const logger = Logger.getLogger('global/eventBus');

// 使用Symbol解决可能引起的命名冲突问题
const EVENT_BUS_UNIQUE_TAG = Symbol('event_bus_unique_tag');

// 缓存主题和主题的订阅者列表
const topics = {};

/**
 * 发布主题消息
 * @param {String|Array} topic 主题
 * @param {*} entity 消息体
 */
function publish(topic, entity) {
    if (utils.isNotEmptyString(topic)) {
        publishTopic(topic, entity);
    } else if (utils.isNotEmptyArray(topic)) {
        publishTopics(topic, entity);
    }
}

/**
 * 发布主题消息
 * @param {String} topic 主题
 * @param {*} entity 消息体
 */
function publishTopic(topic, entity) {
    // 获取该主题的订阅者列表
    const subscribers = topics[topic];

    // 向所有该主题的订阅者发送主题消息
    if (utils.isObject(subscribers)) {
        Object.keys(subscribers).forEach(function(key) {
            const { subscriber, notifier } = subscribers[key];
            utils.isFunction(notifier) && notifier.call(subscriber, topic, entity);
        });
        logger.info('消化了消息', 'event: ', topic, 'entity: ', entity);
    } else {
        logger.info(`消息被丢弃，因为消息 “${topic}” 对应的订阅者列表为空`);
    }
}

/**
 * 发布主题消息
 * @param {Array} topic 主题
 * @param {*} entity 消息体
 */
function publishTopics(topics, entity) {
    if (utils.isNotEmptyArray(topics)) {
        topics.forEach(function(tpc) {
            utils.isNotEmptyString(tpc) && publishTopic(tpc, entity);
        });
    }
}

/**
 * 给订阅者附加事件总线能识别的唯一标记
 * @param {Object} subscriber 订阅者
 */
function stigmatize(subscriber) {
    subscriber[EVENT_BUS_UNIQUE_TAG] = utils.uuid();
    return subscriber;
}

/**
 * 一次登记一个主题
 * @param {String} topic 主题消息
 * @param {Object} subscriber 订阅者
 * @param {Function} notifier 主题消息通知器
 */
function registerTopic(topic, subscriber, notifier) {
    if (!utils.isNotEmptyString(topic)) return;

    // 获取该主题订阅者缓存对象
    if (!utils.isObject(topics[topic])) topics[topic] = {};
    const subscribers = topics[topic];

    // 给订阅者附加事件总线能识别的唯一标记
    subscriber = stigmatize(subscriber);

    // 缓存订阅者
    subscribers[subscriber[EVENT_BUS_UNIQUE_TAG]] = { subscriber, notifier };
}

/**
 * 同时登记多个主题
 * @param {Array} topics
 * @param {Function} notifier 主题消息通知器
 */
function registerTopics(topics, subscriber, notifier) {
    if (utils.isNotEmptyArray(topics)) {
        topics.forEach(topic => {
            utils.isNotEmptyString(topic) && registerTopic(topic, subscriber, notifier);
        });
    }
}

/**
 * 添加主题订阅者
 * @param {String|Array} topic 主题
 * @param {Object} subscriber 实现了notify接口的订阅者
 * @param {Function} notifier 主题消息通知器
 */
function addSubscriber(topic, subscriber, notifier) {
    if (utils.isNotEmptyString(topic)) {
        registerTopic(topic, subscriber, notifier);
    } else if (utils.isNotEmptyArray(topic)) {
        registerTopics(topic, subscriber, notifier);
    }
}

/**
 * 删除对应的订阅者
 * @param subscriber
 */
function removeSubscriber(subscriber) {
    // 遍历所有主题下的订阅者列表，将对应订阅者删除
    Object.keys(topics).forEach(tpc => {
        const topic = topics[tpc];
        delete topic[subscriber[EVENT_BUS_UNIQUE_TAG]];
        if (!Object.keys(topic).length) delete topics[topic];
    });
}

export function enableEventBus() {
    // 输出相关日志
    logger.info('启用事件总线');

    /**
     * 组件销毁后从事件总线移除该组件
     */
    Vue.mixin({
        destroyed: function() {
            removeSubscriber(this);
        }
    });

    /**
     * 发布主题消息
     * @param {String|Array} topic
     * @param {*} entity
     */
    Vue.prototype.$publish = function(topic, entity) {
        if (utils.isNotEmptyString(topic) || utils.isNotEmptyArray(topic)) {
            publish(topic, entity);
        } else {
            logger.error('发布的消息只能是字符串或者字符串数组!');
        }
    };

    /**
     * 订阅主题
     * @param {String|Array} topic 主题消息
     * @param {Function} notifier 主题消息通知器
     */
    Vue.prototype.$subscribe = function(topic, notifier) {
        if (utils.isNotEmptyString(topic) || utils.isNotEmptyArray(topic)) {
            addSubscriber(topic, this, notifier);
        } else {
            logger.error('订阅的消息只能是字符串或者字符串数组!');
        }
    };
}

/**
 * 监听iFrame子页面通过postMessage发送上来的事件
 */
window.addEventListener(
    'message',
    function(e) {
        const data = e.data;
        typeof data.message === 'string' && publish(data.message, data);
    },
    false
);
