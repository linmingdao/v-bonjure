import Vue from 'vue';
import './style.css';
import template from './template.html';
import { deBounce, uniqueMerge } from '../supports/utils';
import { resolveUrl } from '../supports/urlResolver';
import buildHttpClient from '../supports/httpClientBuilder';
const uuid = require('uuid');

export default Vue.extend({
    data() {
        return {
            visible: false,
            placeStyle: {},
            preferences: {},
            httpClient: null,
            options: [],
            buffer: []
        };
    },
    computed: {
        styleObj: function() {
            return {
                width: `${this.$previewBar.clientWidth}px`,
                ...this.placeStyle
            };
        }
    },
    mounted() {
        this.$itemList = this.$refs.comboBox.querySelector('.item-list');
        this.fetchData();
    },
    methods: {
        injectContext(context, preferences) {
            this.preferences = preferences;
            this.$context = context;
            this.$previewBar = this.$context.$refs.previewBar;
            this.$electricSelect = this.$context.$refs.electricSelect;

            // 初始化httpClient对象
            this.httpClient = buildHttpClient({ headers: this.preferences.remote.headers() || {} });

            return this;
        },
        handleClickMask() {
            this.visible = false;
        },
        handleFilterInput: deBounce(function(event) {
            const filterParams = this.preferences.filterParams;
            const filterText = event.target.value;
            this.fetchData(filterParams({ filterText }));
        }, 600, false),
        /**
         * 将后端返回的数据转化成组件识别的格式
         * @param {*} dataSource 
         */
        convertDataSource(dataSource) {
            return dataSource.map(item => {
                return {
                    id: uuid.v4(),
                    active: false,
                    data: {
                        ...item
                    }
                };
            });
        },
        async fetchData(filterParams = {}) {
            const { remote, dataSourceFormatter, value } = this.preferences;

            // 配置请求相关参数信息
            const url = remote.url();
            const headers = (typeof remote['headers'] === 'function' && remote.headers()) || {};
            const queryParams = (typeof remote['queryParams'] === 'function' && remote['queryParams']()) || {};

            // 发起请求
            const res = await this.httpClient.headers(headers).get(resolveUrl(url, {
                ...queryParams,
                ...filterParams
            }));

            // 设置数据源(会根据用户设置的value进行去重操作)
            this.$set(this, 'options', uniqueMerge(this.buffer, this.convertDataSource(dataSourceFormatter(res)), function(item) {
                return value(item['data']);
            }));
        },
        refreshBuffer(list) {
            const idxList = list.map(item => item.getAttribute('index'));
            const buffer = idxList.map(idx => {
                return {
                    ...this.options[idx],
                    active: true
                };
            });
            this.$set(this, 'buffer', buffer);
            this.$context.setPreviweBar(buffer);
        },
        handleClickOptionList(event) {
            const target = event.target;
            if (target.nodeName === 'LI') {
                if (this.preferences.multiple) {
                    // 点击了全选
                    if (target.classList.contains('select-all')) {
                        // 不全选
                        if (target.classList.contains('active')) {
                            Array.from(this.$itemList.querySelectorAll('li')).forEach(function($li) {
                                $li.classList.remove('active');
                            });
                        } else {
                            // 全选
                            Array.from(this.$itemList.querySelectorAll('li')).forEach(function($li) {
                                $li.classList.add('active');
                            });
                        }
                    } else {
                        if (target.classList.contains('active')) {
                            target.classList.remove('active');
                        } else {
                            target.classList.add('active');
                        }
                        // 判断是否全选了
                        if (this.$itemList.querySelectorAll('li.list-item.active').length < this.options.length) {
                            this.$itemList.querySelector('.select-all').classList.remove('active');
                        } else {
                            this.$itemList.querySelector('.select-all').classList.add('active');
                        }
                    }
                } else {
                    if (!target.classList.contains('active')) {
                        Array.from(this.$itemList.querySelectorAll('.active')).forEach(function($li) {
                            $li.classList.remove('active');
                        });
                        target.classList.add('active');
                    }
                }
                this.refreshBuffer(Array.from(this.$itemList.querySelectorAll('li.list-item.active')));
            }
        },
        hide() {
            this.visible = false;
        },
        show() {
            this.place();
            this.visible = true;
        },
        place() {
            const $electricSelect = this.$electricSelect;
            const clientHeight = $electricSelect.clientHeight;
            const boundingClientRect = $electricSelect.getBoundingClientRect();
            const { distanceTop, distanceBottom } = this.getVisibleDistanceInfo();
            if (distanceTop > distanceBottom) {
                this.placeStyle = {
                    bottom: `${document.documentElement.clientHeight - boundingClientRect.top + 10}px`,
                    left: `${boundingClientRect.left}px`
                };
            } else {
                this.placeStyle = {
                    top: `${boundingClientRect.top + clientHeight + 10}px`,
                    left: `${boundingClientRect.left}px`
                };
            }
        },
        getVisibleDistanceInfo() {
            const $electricSelect = this.$electricSelect;
            const boundingClientRect = $electricSelect.getBoundingClientRect();
            const distanceTop = boundingClientRect.top;
            const distanceBottom = document.documentElement.clientHeight - boundingClientRect.bottom;
            return { distanceTop, distanceBottom };
        }
    },
    template
});