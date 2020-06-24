import { appRouter } from './index';

export const goto = path => {
    appRouter.push(path);
    // window.location.reload();
};
