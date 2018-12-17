import notificator from '@core/notificator';

export default {
    data() {
        return {}
    },
    methods: {
        showLoading() {
            notificator.showLoading({ text: '我是loading动画...' });
            setTimeout(() => notificator.hideLoading(), 3000);
        },
        showAlert() {
            // notificator.alert('这是消息内容', {
            //     callback: action => {
            //         console.log(action);
            //     }
            // });
            // notificator.alertInfo('这是消息内容');
            // notificator.alertWarning('这是消息内容');
            notificator.alertSuccess('这是消息内容');
            // notificator.alertError('这是消息内容');
        },
        showConfirm() {
            notificator.confirm('此操作将永久删除该文件, 是否继续?', {
                callback: action => {
                    console.log(action);
                }
            });
        },
        showMessage() {
            // notificator.message('这是消息内容');
            // notificator.messageInfo('这是消息内容');
            notificator.messageWarning('这是消息内容');
            // notificator.messageSuccess('这是消息内容');
            // notificator.messageError('这是消息内容');
        }
    }
};