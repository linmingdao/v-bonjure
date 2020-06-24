/**
 * 默认的模块名
 */
export const DEFAULT_MODULE_NAME = 'Global';

/**
 * 开关常量
 */
export const CONTEXT_FLAGS = {
    COLOR: 'color',
    LEVEL: 'level',
    MODULE: 'module',
    TIME: 'time'
};

/**
 * 级别全称
 */
export const LEVEL_STRING = {
    DEBUG: 'DEBUG',
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR',
    MUTE: 'MUTE'
};

/**
 * 级别简称
 */
export const PADDING_LEVEL_STRING = {
    DEBUG: 'DBG',
    INFO: 'INF',
    WARN: 'WRN',
    ERROR: 'ERR',
    MUTE: 'MUT'
};

/**
 * 日志级别
 */
export const LEVELS = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
    MUTE: 4
};

/**
 * 样式
 */
export const STYLE = {
    BG_COLOR: {
        DEBUG: '#3CABDB',
        INFO: '#167FFC',
        WARN: '#F5C409',
        ERROR: '#FD3259',
        MODULE: '#BD8E66',
        TIME: '#4670A5',
        CONTENT: '#E80A0A'
    },
    FONT_SIZE: '13px'
};

/**
 * 日志日期的输出格式
 */
export const DATE_FORMATTER = 'yyyy/mm/dd HH:mm:ss:l';
