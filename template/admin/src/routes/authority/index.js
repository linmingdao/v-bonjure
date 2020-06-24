import { filter } from './interceptor';

/**
 * 授权验证
 */
export const authorize = (to, from, next) => {
    filter(to, from, next);
};
