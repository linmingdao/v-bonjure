import './env/cmder';
import Logger from './logger/logger';
import LogContext from './logger/logContext';

// 向所有的日志实例注入上下文环境
Logger.injector.LogContext = LogContext;
Logger.injector.logContext = new LogContext();

export default Logger;