//引入路由对象
import VueRouter from 'vue-router';
//引入自己的vue文件
import Home from '../components/home/home.vue';
import Sort from '../components/sort/sort.vue';
import Shopcart from '../components/shopcart/shopcart.vue';
import UserPage from '../components/userPage/userPage.vue';
import UserPage_seller from '../components/userPage/userPage_seller.vue';
import Login from '../components/userPage/login.vue';
import Register from '../components/userPage/register.vue';
import Order from '../components/order/order.vue';
import Success from '../components/order/success.vue';
import Order_list from '../components/order/order_list.vue';
import Address from '../components/address/address.vue';
import Add_address from '../components/address/add_address.vue';
import Product from '../components/product/product.vue';
import MyProduct from '../components/product/myproduct.vue';
import Addprod from '../components/product/addprod.vue';
import Prodputdown from '../components/product/prodputdown.vue';
import OrederHandler from '../components/order/order_handler.vue';
import MoneyDetail from '../components/userPage/money_detail.vue';
import test from '../components/test.vue';

let router = new VueRouter({
	//设置router-Link激活时的类
	linkActiveClass: 'is-selected',

	routes: [{
			path: '/',
			redirect: {
				name: 'home'
			}
		}, {
			name: 'home',
			path: '/home',
			component: Home
		}, {
			name: 'sort',
			path: '/sort',
			component: Sort
		}, {
			name: 'shopcart',
			path: '/shopcart',
			component: Shopcart
		}, {
			name: 'test',
			path: '/test',
			component: test
		}, {
			name: 'order',
			path: '/order',
			component: Order
		}, {
			name: 'success',
			path: '/success',
			component: Success
		}, {
			name: 'order_list',
			path: '/order_list',
			component: Order_list
		},
		{
			name: 'order_handler',
			path: '/order_handler',
			component: OrederHandler
		}, {
			name: 'address',
			path: '/address',
			component: Address
		}, {
			name: 'add_address',
			path: '/add_address',
			component: Add_address
		}, {
			name: 'product',
			path: '/product',
			component: Product
		}, {
			name: 'login',
			path: '/login',
			component: Login
		}, {
			name: 'register',
			path: '/register',
			component: Register
		},
		{
			name: 'userPage',
			path: '/user/userPage',
			component: UserPage
		},
		{
			name: 'userPage_seller',
			path: '/user/Page_seller',
			component: UserPage_seller
		},
		{
			name: 'user',
			path: '/user',

			redirect: to => {
				var str = router.app.$options.store.getters['loginedUser/getloginedUser'];
				var u = JSON.parse(str);
				if(u != null && u.username != null && u.type == 1) {
					return {
						name: 'userPage'
					}
				} else if(u != null && u.username != null && u.type == 2) {
					return {
						name: 'userPage_seller'
					}
				} else {
					return {
						name: 'login'
					}
				}

			}
		}, {
			name: 'myproduct',
			path: '/myproduct',
			component: MyProduct
		}, {
			name: 'addprod',
			path: '/addprod',
			component: Addprod
		}, {
			name: 'prodputdown',
			path: '/prodputdown',
			component: Prodputdown
		}, {
			name: 'money_detail',
			path: '/money_detail',
			component: MoneyDetail
		}
	],

})

export default router;