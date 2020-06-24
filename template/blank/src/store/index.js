import * as MODULES from '../constants/modules.js';
// 全局状态
import global from './global';
// 其他业务模块的状态
import home from './home';

export default {
    [MODULES.GLOBAL]: global,
    [MODULES.HOME]: home
};
