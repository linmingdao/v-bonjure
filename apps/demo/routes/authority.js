/**
 * 授权验证
 */
export const authorize = (to, from, next) => {
    if (true) {
        next();
    } else {
        next({ path: '/login' });
    }
};