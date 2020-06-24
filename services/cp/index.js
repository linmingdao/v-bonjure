let targetUrl = '';
switch (process.env.BUILD_ENV) {
    case 'prod':
        // 生产环境
        targetUrl = 'http://cp.onemt.co';
        break;
    case 'prep':
        // 提审(预生产)环境
        targetUrl = 'http://10.0.0.226:8104';
        break;
    case 'test':
        // 测试环境
        targetUrl = 'http://cp.bigdata.onemt.co/';
        break;
    case 'dev':
        // 开发环境
        targetUrl = 'http://cp.bigdata.onemt.co/';
        break;
    default:
        // 开发环境
        targetUrl = 'http://10.0.0.23:8004';
}

// TODO 修正#号的问题
function urlPrefix(mode) {
    return `${window.location.protocol}//${window.location.hostname}:${window.location.port}${
        mode === 'hash' ? '/#' : ''
    }`;
}

export default {
    switchToTab(code) {
        const cmder = `$('.J_menuTab[navtabid="${code}"]').trigger('click');`;
        top.postMessage(cmder, targetUrl);
    },
    openInNewTab(url, tabName, mode = 'hash') {
        url = `${urlPrefix(mode)}${url}`;
        const cmder = `setTab('${url}', '${tabName}', false)`;
        top.postMessage(cmder, targetUrl);
    },
    closeActiveTab() {
        top.postMessage('closeActiveTab()', targetUrl);
    },
    sendMessage(event) {
        top.postMessage(event, targetUrl);
    }
};
