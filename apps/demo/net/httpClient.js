import Http from '@vbonjour/Http';
import Logger from '@vbonjour/Logger';
import { goto } from '@vbonjour/router';
import notificator from '@vbonjour/notificator';
import * as localStorageHelper from '../utils/localStorageHelper';
import { MESSAGE_TYPE, STATUS_CODE, NOTIFICATION_ACTION } from '../constants/index.js';

const logger = Logger.getLogger('App/Net');

/**
 * 1、框架层提供的http服务已经为业务开发者考虑到各种场景了，通常情况下默认配置的功能特性应该是够用的
 * 2、在框架提供的http默认功能配置不够用的情况下，应用可以在框架层特性之上定制一个的http请求客户端
 * 
 * 比如下面这个http客户端就是处理下面两个公共操作：
 * (1)、每次调用请求方法的时候会获取最新的token信息，方便后端做身份校验;
 * (2)、拦截token过期的响应结果，并提示用户重新登录;
 * 
 * ps：应用层只处理应用状态码，http的状态码框架层帮你处理掉了，当然如果你觉得不需要框架层帮你处理你也可以通过框架提供的http钩子函数自己处理
 */
const httpClient = Http.getClient()
    // 请求之前会先调用before设置的回调函数，http模块会把http客户端引用塞给before设置的回调函数
    .before(client => {
        // 由于可能存在用户频繁登出登录，所以token可能是时时改变的，所以在before的回调里面进行动态headers的设置
        // 无法调用client.headers()，因为已经被locked了
        client.reqheader.token = localStorageHelper.get('token');
    })
    // 设置请求头, 只会执行一次，可以设置一些静态的表头信息，如果有动态的表头，比如token，那么请在before回调里面进行设置
    // .headers({ 'token': localStorageHelper.get('token') })
    // 配置拦截器
    .intercept(response => {
        switch (response.code) {
            // token过期
            case STATUS_CODE.TOKEN_EXPIRED:
                logger.debug('token过期，请重新登录!');
                notificator.alertWarning(MESSAGE_TYPE.TOKEN_EXPIRED, {
                    showClose: false,
                    callback: action => {
                        action === NOTIFICATION_ACTION.CONFIRM && goto('/login');
                    }
                });
                break;
            default:
                ;
        }
    })
    // 配置完之后上锁，该请求客户端不再是可配置的，目的是防止不同开发人员篡改公共的请求客户端配置
    .lock();

export default httpClient;