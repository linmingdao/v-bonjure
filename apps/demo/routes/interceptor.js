import Http from '@vbonjour/Http';
import Logger from '@vbonjour/Logger';
import * as API from '../net/api';
import { STATUS_CODE } from '../constants/index.js';
import * as localStorageHelper from '../utils/localStorageHelper';

const logger = Logger.getLogger('App/Router/Interceptor');

// 路由拦截器
const interceptor = {
    // 配置不需要拦截的路径
    exclude: ['/login', '/404'],
    /**
     * 判断该路径时候需要执行过滤，true：需要过滤，false：不需要过滤
     * @param {String} path 
     */
    inFilterChain(path) {
        return !this.exclude.includes(path);
    },
    /**
     * 执行相关的权限过滤
     * @param {Object} to 要前往的路径信息
     * @param {Object} from 要离开的路径信息
     * @param {Function} next 放行函数
     */
    filter(to, from, next) {
        if (this.inFilterChain(to.path)) {
            this.doFilter(next);
        } else {
            next();
        }
    },
    /**
     * 执行过滤器
     * @param {Function} next 放行函数
     */
    async doFilter(next) {
        const response = await Http.getClient().headers({ 'token': localStorageHelper.get('token') }).disableLoading().get(API.TOKEN_EXPIRED);
        if (response.code === STATUS_CODE.TOKEN_NOT_EXPIRED) {
            next();
        } else {
            logger.debug('路由拦截器拦截到用户还未登录，跳转到登录页');
            next({ path: '/login' });
        }
    }
};

export default interceptor;