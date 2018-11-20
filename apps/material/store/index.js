import { MODULES } from './types.js';

// 导入各个模块的状态
import home from './modules/home.js';
import login from './modules/login.js';

// 导出所有模块的状态
export default {
    [MODULES.HOME]: home,
    [MODULES.LOGIN]: login
};