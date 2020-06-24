import TextResolver from './impl/textResolver';
import JsonResolver from './impl/jsonResolver';

export default {
    // 独立类型——application
    'application/json': JsonResolver,
    // 独立类型——text
    'text/javascript': TextResolver,
    'text/markdown': TextResolver,
    'text/plain': TextResolver,
    'text/html': TextResolver,
    'text/css': TextResolver
};
