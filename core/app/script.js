/**
 * 这是提供给应用开发者的根节点，会以id="app"的形式渲染在文档中
 * 应用开发者都在这个根节点下面进行业务开发
 */
export default {
    name: 'app',
    data() {
        return {
            transitionName: 'slide-left'
        };
    },
    // dynamically set transition based on route change
    watch: {
        $route(to, from) {
            const toDepth = to.path.split('/').length;
            const fromDepth = from.path.split('/').length;
            this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
        }
    }
};
