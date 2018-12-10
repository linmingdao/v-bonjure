import Vue from 'vue';
import {
    MESSAGE_TYPE,
    defaultLoadingOption,
    defaultAlertOption,
    defaultConfirmOption,
    defaultPromptOption,
    defaultMsgBoxOption,
    defaultOption
} from './option';

// LoadingBox 是基于 ElementUI 的，获取 ElementUI $loading服务
const $msgbox = Vue.prototype.$msgbox;
const $alert = Vue.prototype.$alert;
const $confirm = Vue.prototype.$confirm;
const $prompt = Vue.prototype.$prompt;
const $message = Vue.prototype.$message;
const $loading = Vue.prototype.$loading;

/**
 * 消息通知者, 主要负责:
 * 1、各种消息弹窗的显示与隐藏;
 * 2、loading弹窗的显示与隐藏
 */
export default class Notification {

    constructor(opt = defaultOption) {
        this.config(opt);
        this.loading = null;
        this.alert = null;
        this.confirm = null;
        this.prompt = null;
        this.msgBox = null;
    }

    config({ loading, alert, confirm, prompt, msgBox }) {
        this.configLoading(loading || defaultLoadingOption)
            .configAltert(alert || defaultAlertOption)
            .configConfirm(confirm || defaultConfirmOption)
            .configPrompt(prompt || defaultPromptOption)
            .configMsgBox(msgBox || defaultMsgBoxOption);
    }

    /********************************************** loading box **********************************************/

    configLoading(opt = defaultLoadingOption) {
        this.loadingOpt = opt;
        return this;
    }

    showLoading(opt = defaultLoadingOption) {
        this.loading = $loading(opt || this.loadingOpt);
        return this;
    }

    hideLoading() {
        this.loading && this.loading.close();
        return this;
    }

    /********************************************** alert **********************************************/

    configAltert(opt = defaultAlertOption) {
        return this;
    }

    alert() {
        $alert('这是一段内容', '标题名称', {
            confirmButtonText: '确定',
            callback: action => {
                this.$message({
                    type: 'info',
                    message: `action: ${ action }`
                });
            }
        });
    }

    /********************************************** confirm **********************************************/

    configConfirm(opt = defaultConfirmOption) {
        return this;
    }

    confirm() {
        $confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            $message({
                type: 'success',
                message: '删除成功!'
            });
        }).catch(() => {
            $message({
                type: 'info',
                message: '已取消删除'
            });
        });
    }

    /********************************************** prompt **********************************************/

    configPrompt(opt = defaultPromptOption) {
        return this;
    }

    prompt() {
        $prompt('请输入邮箱', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
            inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
            $message({
                type: 'success',
                message: '你的邮箱是: ' + value
            });
        }).catch(() => {
            $message({
                type: 'info',
                message: '取消输入'
            });
        });
    }

    /********************************************** msgbox **********************************************/

    configMsgBox(opt = defaultMsgBoxOption) {
        return this;
    }

    msgbox() {
        $msgbox({
            title: '消息',
            message: h('p', null, [
                h('span', null, '内容可以是 '),
                h('i', { style: 'color: teal' }, 'VNode')
            ]),
            showCancelButton: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            beforeClose: (action, instance, done) => {
                if (action === 'confirm') {
                    instance.confirmButtonLoading = true;
                    instance.confirmButtonText = '执行中...';
                    setTimeout(() => {
                        done();
                        setTimeout(() => {
                            instance.confirmButtonLoading = false;
                        }, 300);
                    }, 3000);
                } else {
                    done();
                }
            }
        }).then(action => {
            $message({
                type: 'info',
                message: 'action: ' + action
            });
        });
    }

    /********************************************** 实例获取静态方法 **********************************************/

    static getInformer(option = defaultOption) {
        return new Notification(option);
    }
};