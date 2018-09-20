<template>
	<div class="myOrder">
		<div class="allorder">
			<div class="title">
				<span class="iconfont icon-quanbudingdan"></span>
				我的订单
				<router-link :to="{name:'order_list'}" tag="p">查看更多订单 ></router-link>
			</div>
			<ul>
				<li>
					<router-link :to="{name:'order_list',query:{state:0}}" >
						<p class="iconfont icon-daishenhe"></p>
						<p>待付款</p>
					</router-link>
				</li>
				<li>
					<router-link :to="{name:'order_list',query:{state:1}}" >
						<p class="iconfont icon-daifahuo"></p>
						<p>待发货</p>
					</router-link>
				</li>
				<li>
					<router-link :to="{name:'order_list',query:{state:2}}" >
						<p class="iconfont icon-daishouhuo"></p>
						<p>待收货</p>
					</router-link>
				</li>
				<li>
					<router-link :to="{name:'order_list',query:{state:4}}" >
						<p class="iconfont icon-huaduo"></p>
						<p>退款/售后</p>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
				wallet: {}
			}
		},
		created() {
//			this.$ajax.get('/my/getwalletById/' + this.getUsers.u_id).then(data => {
//				data = data.data;
//				this.wallet = data.message[0];
//			})
		},
		methods: {

		},
		computed: {
			getUsers() {
				return JSON.parse(this.$store.getters['loginedUser/getloginedUser']);
			}
		}
	}
</script>

<style scoped>
	@import url("../../static/css/myOrder.css");
</style>