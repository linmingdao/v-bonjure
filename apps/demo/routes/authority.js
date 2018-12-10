const interceptor = {
    // 配置不需要过滤的路径
    exclude: ['/login', '/404'],
    // 执行相关的权限过滤
    filter(to, from, next) {
        if (!this.exclude.includes(to.path)) {
            console.log('执行过滤...');
            // if (true) {
            //     next();
            // } else {
            //     next({ path: '/login' });
            // }
            next();
        } else {
            next();
        }
    }
};

/**
 * 授权验证
 */
export const authorize = (to, from, next) => {
    interceptor.filter(to, from, next);
};