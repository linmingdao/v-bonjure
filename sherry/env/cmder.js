/**
 * 全局命令行
 *
 * @author linmingdao
 */
import g from './g';
import conf from './config';
import { LEVEL_STRING } from '../constants';

/**
 * 打开某个模块的日志
 */
!g.sherryon && (g.sherryon = moduleName => {
    // 打开所有模块日志
    if (moduleName.trim() === '**') {
        conf['filter'] = {};
    } else {
        // 打开某个模块日志
        moduleName = moduleName.trim().replace(/\//g, '.').toLowerCase();
        const filter = conf['filter'];
        filter.hasOwnProperty(moduleName) && delete filter[moduleName];
    }
});

/**
 * 屏蔽某个模块的日志打印
 */
!g.sherryoff && (g.sherryoff = moduleName => {
    moduleName = moduleName.trim().replace(/\//g, '.').toLowerCase();
    const filter = conf['filter'];
    !filter.hasOwnProperty(moduleName) && (filter[moduleName] = 'off');
});

/**
 * 设置日志级别
 */
!g.sherrylevel && (g.sherrylevel = (level = LEVEL_STRING.DEBUG) => {
    level = level.trim().toUpperCase();
    LEVEL_STRING.hasOwnProperty(level) && (conf['level'] = LEVEL_STRING[level]);
});

/**
 * 设置日志的开关
 */
!g.sherry && (g.sherry = flags => {
    if (flags && Array.isArray(flags)) {
        conf['context-flags'] = flags;
    }
});

/**
 * 获取配置信息
 */
!g.sherryconf && (g.sherryconf = () => conf);