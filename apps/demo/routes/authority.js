import interceptor from './interceptor';

/**
 * 授权验证
 */
export const authorize = (to, from, next) => {
    interceptor.filter(to, from, next);
};