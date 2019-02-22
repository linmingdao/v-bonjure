module.exports = {
    MODE: {
        PRODUCTION: 'production',
        DEVELOPMENT: 'development'
    },
    // webpack构建模式
    BUILD_MODE: {
        // 本地开发模式
        'LOCAL_DEV': 'local_development',
        // 应用打包模式
        'APP_BUNDLE': 'app_bundle'
    },
    // 构建何种环境的应用包标识
    BUNDLE_TARGET: {
        // 构建开发环境应用包
        'DEV': 'dev',
        // 构建测试环境应用包
        'TEST': 'test',
        // 构建生产环境应用包
        'PROD': 'prod'
    }
};