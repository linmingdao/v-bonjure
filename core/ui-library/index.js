import Vue from 'vue';
// 接入默认的UI组件库(element-ui)
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/zh-CN';
// 处理不同浏览器的默认样式的差异(用Normalize.css替代CSS reset)
import 'normalize.css';

// 使用element-ui快速构建ui
Vue.use(Element, { locale });