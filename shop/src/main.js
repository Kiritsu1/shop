'use strict';

import Vue from 'vue';
import App from './app.vue';

//注册为全局组件
import MyHeader from './components/common/myheader.vue';
import bottomNav from './components/common/bottomnav.vue';
import Search from './components/search/search.vue';
import myOrder from './components/userPage/myOrder.vue';
Vue.component('search', Search);
Vue.component('myheader', MyHeader);
Vue.component('bottomnav', bottomNav);
Vue.component('myorder', myOrder);

//引入全局样式
import './static/css/global.css'
//引入字体文件
import './static/font/iconfont.css'
import './static/font/iconfont2.css'

//引入mint-ui
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(Mint);

//引入moment模块来进行时间的格式化
import Moment from 'moment';
//引入moment模块来进行时间的格式化定义成全局过滤器
Vue.filter('convertDate', function(value) {
	return Moment(value).format("YYYY-MM-DD hh:mm:ss");
})

//引入axios,命名为  ajax
import Axios from 'axios';
//Axios.defaults.baseURL = 'http://localhost:9999/';
Vue.prototype.$ajax = Axios;
//拦截器操作loading
Axios.interceptors.request.use(function(config) {
	//	显示加载中图标
	Vue.$indicator.open({
		text: '加载中...',
		spinnerType: 'fading-circle'
	});
	return config;
})

Axios.interceptors.response.use(function(config) {
	//	隐藏加载中图标
	Vue.$indicator.close();
	return config;
})

//引入工具
import prodTools from "./components/common/prodTools"
Vue.prototype.$prodtools = prodTools;
import userTools from "./components/common/userTools"
Vue.prototype.$usertools = userTools;

//引入vuex
import Vuex from 'vuex';
Vue.use(Vuex);

import userstore from './modules/users.js';

//创建一个Stroe
let store = new Vuex.Store({
	modules: {
		loginedUser: userstore
	}
});

//引入路由部分
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import router from './routes/router.js';

new Vue({
	el: '#app',
	render: c => c(App),
	router,
	store
})