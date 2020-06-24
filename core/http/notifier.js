import Notification from '@core/notification';

const notificator = Notification.getNotificator();

/**
 * 消息通知组件
 */
let noticeComponent = {
    alertError(msg = '') {
        notificator.alertError(msg);
    },
    showLoading() {
        notificator.showLoading();
    },
    hideLoading() {
        notificator.hideLoading();
    }
};

/**
 * 覆盖消息通知组件
 * @param {*} component
 */
export function overrideNotifier(component) {
    noticeComponent = { ...noticeComponent, ...component };
}

/**
 * alert错误消息
 * @param {*} msg
 */
export function alertError(msg = '') {
    noticeComponent.alertError(msg);
}

/**
 * loading计数器，控制全局只有一个loading控件实例
 */
export const loadingController = {
    _cnt: 0,
    set cnt(newVal) {
        this._cnt = newVal;
        this._cnt > 0 ? noticeComponent.showLoading() : noticeComponent.hideLoading();
    },
    get cnt() {
        return this._cnt;
    },
    increase() {
        this.cnt += 1;
    },
    decrease() {
        this.cnt > 0 && (this.cnt -= 1);
    }
};
