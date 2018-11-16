import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Element from 'element-ui';
import locale from 'element-ui/lib/locale/lang/zh-CN';

// 业务组件
import App from './components/app.vue';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Element, { locale });

new Vue({
    el: '#app',
    render: h => h(App)
});