import { LEVEL_STRING, CONTEXT_FLAGS } from '../constants';

/**
 * 全局配置文件
 * 
 * @author linmingdao
 */
export default {
    "level": LEVEL_STRING.DEBUG,
    "filter": {},
    "context-flags": [CONTEXT_FLAGS.COLOR, CONTEXT_FLAGS.LEVEL, CONTEXT_FLAGS.MODULE, CONTEXT_FLAGS.TIME]
};