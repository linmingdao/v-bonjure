/**
 * 框架层公共路由默认配置
 */
export default {
    /**
     * 是否启用公共路由
     * 可选值：true: 启用，false: 禁用
     * 启用，那么框架提供的公共路由配置会被混入到应用中
     */
    usePublicRoutes: true,
    /**
     * 是否使用404路由
     * 可选值：true: 启用，false: 禁用
     */
    use404Route: true
};