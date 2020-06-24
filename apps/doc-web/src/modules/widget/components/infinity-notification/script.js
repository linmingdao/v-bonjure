import notificator from '@core/notificator';
export default {
    methods: {
        alert() {
            notificator.alert(
                '504 Gateway Timeout：http://10.0.0.226:9006/mojing/conf/checkNameRepeat?extractId=158&extractName=%E6%B5%8B%E8%AF%95%E4%B8%80%E4%B8%8B%E2%80%94%E2%80%94%E9%BB%84%E9%87%91er&projectCode=rk',
                {
                    type: 'info',
                    callback: option => {
                        notificator.message('alert：' + option);
                    }
                }
            );
        },
        alertInfo() {
            notificator.alertInfo('info', {
                callback: option => {
                    notificator.message('alertInfo：' + option);
                }
            });
        },
        alertWarning() {
            notificator.alertWarning('warning', {
                callback: option => {
                    notificator.message('alertWarning：' + option);
                }
            });
        },
        alertSuccess() {
            notificator.alertSuccess('success', {
                callback: option => {
                    notificator.message('alertSuccess：' + option);
                }
            });
        },
        alertError() {
            notificator.alertError('error', {
                callback: option => {
                    notificator.message('alertError：' + option);
                }
            });
        },
        confirm() {
            notificator.confirm('confirm', {
                callback: option => {
                    notificator.message('confirm：' + option);
                }
            });
        },
        confirmInfo() {
            notificator.confirmInfo('info', {
                callback: option => {
                    notificator.message('confirmInfo：' + option);
                }
            });
        },
        confirmWarning() {
            notificator.confirmWarning('warning', {
                callback: option => {
                    notificator.message('confirmWarning：' + option);
                }
            });
        },
        confirmSuccess() {
            notificator.confirmSuccess('success', {
                callback: option => {
                    notificator.message('confirmSuccess：' + option);
                }
            });
        },
        confirmError() {
            notificator.confirmError('error', {
                callback: option => {
                    notificator.message('confirmError：' + option);
                }
            });
        },
        message() {
            notificator.message('message');
        },
        messageInfo() {
            notificator.messageInfo('info');
        },
        messageWarning() {
            notificator.messageWarning('warning');
        },
        messageSuccess() {
            notificator.messageSuccess('success');
        },
        messageError() {
            notificator.messageError('error');
        },
        showLoading() {
            notificator.showLoading('不要紧张，三秒后自动关闭');
            // 3s 后关闭
            setTimeout(() => {
                notificator.hideLoading();
            }, 3000);
        },
        autoHeight() {
            notificator.alertInfo(
                '我有很多很多很多很多很多内容我有很多很多很多很多很多内容我有很多很多很多很多很多内容我有很多很多很多很多很多内容我有很多很多很多很多很多内容我有很多很多很多很多很多内容',
                {
                    callback: option => {
                        notificator.message('alertInfo：' + option);
                    }
                }
            );
        },
        astrictHeight() {
            notificator.alertInfo(
                '我有很多很多很多很多很多内容我有很多很多很多很多很多内容我有很多很多很多很多很多内容我有很多很多很多很多很多内容我有很多很多很多很多很多内容我有很多很多很多很多很多内容我有很多很多很多很多很多内容我有很多很多很多很多很多内容我有很多很多很多很多很多内容我有很多很多很多很多很多内容我有很多很多很多很多很多内容我有很多很多很多很多很多内容',
                {
                    height: 100,
                    callback: option => {
                        notificator.message('alertInfo：' + option);
                    }
                }
            );
        },
        autoWidth() {
            notificator.alert(
                '504 Gateway Timeout：http://10.0.0.226:9006/mojing/conf/checkNameRepeat?extractId=158&extractName=%E6%B5%8B%E8%AF%95%E4%B8%80%E4%B8%8B%E2%80%94%E2%80%94%E9%BB%84%E9%87%91er&projectCode=rk',
                {
                    type: 'info',
                    callback: option => {
                        notificator.message('alert：' + option);
                    }
                }
            );
        },
        astrictWidth() {
            notificator.alert(
                '504 Gateway Timeout：http://10.0.0.226:9006/mojing/conf/checkNameRepeat?extractId=158&extractName=%E6%B5%8B%E8%AF%95%E4%B8%80%E4%B8%8B%E2%80%94%E2%80%94%E9%BB%84%E9%87%91er&projectCode=rk',
                {
                    type: 'info',
                    width: 500,
                    callback: option => {
                        notificator.message('alert：' + option);
                    }
                }
            );
        },
        dangerouslyUseHTMLString() {
            notificator.alertInfo('<img src="https://cn.vuejs.org/images/logo.png"/>', {
                dangerouslyUseHTMLString: true,
                callback: option => {
                    notificator.message('alertInfo：' + option);
                }
            });
        },
        notICON() {
            notificator.alertInfo('<img src="https://cn.vuejs.org/images/logo.png"/>', {
                dangerouslyUseHTMLString: true,
                showIcon: false,
                callback: option => {
                    notificator.message('alertInfo：' + option);
                }
            });
        }
    }
};
