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
    moduleName = moduleName.trim().replace(/\//g, '.').toLowerCase();
    const filter = conf['filter'];
    filter.hasOwnProperty(moduleName) && delete filter[moduleName];
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
!g.sherrylevel && (g.sherrylevel = level => {
    level = level.trim().toUpperCase();
    LEVEL_STRING.hasOwnProperty(level) && (conf['level'] = LEVEL_STRING[level]);
});

/**
 * 获取配置信息
 */
!g.sherry && (g.sherry = switchList => {
    conf['switch'] = switchList;
});

/**
 * 获取配置信息
 */
!g.sherryconf && (g.sherryconf = () => conf);