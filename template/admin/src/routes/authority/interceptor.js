// 路由拦截器

// 配置不需要拦截的路径
const exclude = ['/login', '/404'];

/**
 * 判断该路径时候需要执行过滤，true：需要过滤，false：不需要过滤
 * @param {String} path
 */
function inFilterChain(path) {
    return !exclude.includes(path);
}

/**
 * 执行过滤器
 * @param {Function} next 放行函数
 */
async function doFilter(next) {
    next();
    // if (true) {
    //     next();
    // } else {
    //     logger.debug('路由拦截器拦截到用户还未登录，跳转到登录页');
    //     next({ path: '/login' });
    // }
}

/**
 * 执行相关的权限过滤
 * @param {Object} to 要前往的路径信息
 * @param {Object} from 要离开的路径信息
 * @param {Function} next 放行函数
 */
export function filter(to, from, next) {
    if (inFilterChain(to.path)) {
        doFilter(next);
    } else {
        next();
    }
}
