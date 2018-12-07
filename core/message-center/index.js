import Vue from 'vue';

const $msgbox = Vue.prototype.$msgbox;
const $alert = Vue.prototype.$alert;
const $confirm = Vue.prototype.$confirm;
const $prompt = Vue.prototype.$prompt;
const $message = Vue.prototype.$message;

const TYPE = {
    INFO: 'info',
    WARNING: 'warning',
    SUCCESS: 'success',
    ERROR: 'error',
};

/**
 * 消息中心
 */
export default class MessageCenter {

    constructor() {

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

};