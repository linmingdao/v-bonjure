import './env/cmder';
import Logger from './logger/logger';
import LogContext from './logger/logContext';

Logger.injector.LogContext = LogContext;
Logger.injector.logContext = new LogContext();

export default Logger;