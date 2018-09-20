<template>
	<div class="tmpl userpage_seller">
		<div class="myphoto">
			<div class="photoandname">
				<div class="headphoto">
					<img src="../../static/img/muwu.jpg" />
				</div>
				<div class="name">
					{{getUsers.username}}
				</div>
			</div>
			<ul class="userdata">
				<li>
					<p>
						资格
					</p>
					<span>
						{{rank[getUsers.type]}}
					</span>
				</li>
				<li>
					<p>
						累计销售
					</p>
					<span>
						{{shop.sellcount}}
					</span>
				</li>
				<li>
					<p>
						已结算金额
					</p>
					<span>
						¥{{wallet.alreadysettled}}
					</span>
				</li>
			</ul>
		</div>
		<myorder></myorder>
		<div class="allorderHandle">
			<div class="title">
				<span class="iconfont icon-quanbudingdan"></span>
				订单处理
				<router-link :to="{name:'order_handler',query:{shopid:shop.shop_id}}" tag="p">查看更多订单 ></router-link>

			</div>
			<ul>

				<li>
					<router-link :to="{name:'order_handler',query:{state:1,shopid:shop.shop_id}}">
						<p class="iconfont icon-daifahuo"></p>
						<p>待发货</p>
					</router-link>
				</li>

				<li>
					<router-link :to="{name:'order_handler',query:{state:4,shopid:shop.shop_id}}">
						<p class="iconfont icon-huaduo"></p>
						<p>待退款</p>
					</router-link>
				</li>
			</ul>
		</div>

		<div class="allproduct">
			<div class="title">
				<span class="iconfont icon-quanbudingdan"></span>
				商品处理
			</div>
			<ul>
				<li>
					<router-link :to="{name:'myproduct',query:{shopid:shop.shop_id}}">
						<p class="iconfont icon-goods-active"></p>
						<p>我的商品</p>
					</router-link>
				</li>
				<li>
					<router-link :to="{name:'addprod',query:{shopid:shop.shop_id,action:'add'}}">
						<p class="iconfont icon-shangjia"></p>
						<p>商品上架</p>
					</router-link>
				</li>
				<li>
					<router-link :to="{name:'prodputdown',query:{shopid:shop.shop_id}}">
						<p class="iconfont icon-xiajia"></p>
						<p>商品下架</p>
					</router-link>
				</li>
			</ul>
		</div>

		<div class="options">
			<mt-cell title="余额">
				<span>{{wallet.money}}</span>
			</mt-cell>

			<mt-cell title="余额明细" is-link :to="{name:'money_detail'}"></mt-cell>

			<mt-cell title="申请提现"></mt-cell>

		</div>
		<a href="#" @click.prevent="logout()">logout</a>

		<bottomnav></bottomnav>

	</div>

</template>

<script>
	export default {
		data() {
			return {
				rank: {
					1: '普通用户',
					2: '分销商'
				},
				wallet: {},
				shop: {}
			}
		},
		created() {
			if(this.getUsers.u_id == null || this.getUsers.u_id == '') {
				this.$router.push({
					name: 'user'
				});
				return
			} 
				this.$ajax.get('/my/getwalletById/' + this.getUsers.u_id).then(data => {
					data = data.data;
					this.wallet = data.message[0];
				})

				this.$ajax.get('/my/getshopByuid/' + this.getUsers.u_id).then(data => {
					data = data.data;
					this.shop = data.message[0];

				})
			
		},
		methods: {
			logout() {
				this.$usertools.logout();
				this.$store.commit("loginedUser/logout");
				this.$router.push({
					name: 'user'
				});
			}
		},
		computed: {
			getUsers() {
				return JSON.parse(this.$store.getters['loginedUser/getloginedUser']);
			}
		}
	}
</script>

<style scoped>
	@import url("../../static/css/userPage_seller.css");
</style>