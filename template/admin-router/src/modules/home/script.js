import menus from '../menu';
import screenfull from 'screenfull';

export default {
    data() {
        return {
            menus,
            dynamicTabs: [],
            currentActiveTabId: '-1',
            urlObj: {},
            isCollapse: false
        };
    },
    mounted() {
        // 平台的判断
        const { isPhone, isAndroid } = window.$platform;
        if (isPhone || isAndroid) {
            this.isCollapse = true;
        }

        // 处理默认选中的菜单逻辑
        this.handleSelectMenuItem(this.currentActiveTabId);
    },
    created() {
        this.handleMenus();
    },
    methods: {
        attachTabId(mItem, pIdx) {
            mItem['tabId'] = `${pIdx}`;
            if (mItem.children) {
                mItem.children.forEach((item, index) => {
                    this.attachTabId(item, `${pIdx}-${index}`);
                });
            } else {
                mItem.defaultActive && (this.currentActiveTabId = pIdx);
                this.urlObj[pIdx] = mItem.path;
            }
        },
        /**
         * 处理菜单
         */
        handleMenus() {
            this.menus.forEach((item, index) => {
                this.attachTabId(item, index + '');
            });
        },
        /**
         * 生成url
         * @param {*} url
         */
        generateUrl(url) {
            let params = this.$route.query;
            let res = [];
            for (const key in params) {
                if (params.hasOwnProperty(key)) {
                    const val = params[key];
                    res.push(`${key}=${val}`);
                }
            }
            return `/home/${url}?${res.join('&')}`;
        },
        /**
         * 全屏的切换
         */
        toggleFullScreen() {
            if (screenfull.isFullscreen) {
                screenfull.exit();
            } else {
                screenfull.request();
            }
        },
        /**
         * 处理选中左侧菜单项
         * @param {*} index
         */
        handleSelectMenuItem(index) {
            let path = this.$route.path;
            if (path === '/home') {
                if (index === '-1') return;
            } else {
                path = path.replace(/\/home\//, '');
                Object.keys(this.urlObj).forEach(item => {
                    if (this.urlObj[item] === path) {
                        index = item;
                    }
                });
            }
            // 找到菜单指定的组件信息
            const indexArr = index.split('-');
            let target = this.menus[indexArr[0]];
            indexArr.length &&
                indexArr.slice(1).forEach(idx => {
                    const children = target.children;
                    target = children[idx];
                });
            // 判断是否已经在tab中打开该组件了：已经打开了则激活tab，未打开则新增tab并激活
            const result = this.dynamicTabs.find(item => target.tabId === item.tabId);
            !result && this.dynamicTabs.push(target);
            this.currentActiveTabId = target.tabId;
            this.$router.push(this.generateUrl(this.urlObj[this.currentActiveTabId]));
        },
        /**
         * 激活tab
         * @param {*} param0
         */
        clickTab({ name }) {
            this.currentActiveTabId = name;
            this.$router.push(this.generateUrl(this.urlObj[name]));
        },
        /**
         * 删除tab
         * @param {*} targetTabId
         */
        removeTab(targetTabId) {
            let tabs = this.dynamicTabs;
            let activeTabId = this.currentActiveTabId;
            if (activeTabId === targetTabId) {
                tabs.forEach((tab, index) => {
                    if (tab.tabId === targetTabId) {
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            activeTabId = nextTab.tabId;
                        }
                    }
                });
            }
            this.dynamicTabs = tabs.filter(item => item.tabId !== targetTabId);
            this.currentActiveTabId = this.dynamicTabs.length ? activeTabId : '';
            if (this.currentActiveTabId) {
                this.$router.push(this.generateUrl(this.urlObj[this.currentActiveTabId]));
            } else {
                this.$router.push(this.generateUrl(''));
            }
        }
    }
};
