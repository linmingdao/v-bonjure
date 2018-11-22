import Logger from './Logger';
import LogContext from './LogContext';

Logger.injector.LogContext = LogContext;
Logger.injector.logContext = new LogContext();

export default Logger;