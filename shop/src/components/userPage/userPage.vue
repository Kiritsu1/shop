<template>
	<div class="tmpl userpage">
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
						我的等级
					</p>
					<span>
						{{rank[getUsers.type]}}
					</span>
				</li>
				<li>
					<p>
						待结算金额
					</p>
					<span>
						¥{{wallet.foraccount}}
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
		<div class="box"></div>
		<div class="myfocus">

			<ul>
				<li>
					<a href="#">
						<p>0</p>
						<p>商品收藏</p>
					</a>
				</li>
				<li>
					<a href="#">
						<p>0</p>
						<p>店铺关注</p>
					</a>
				</li>
				<li>
					<a href="#">
						<p>0</p>
						<p>内容收藏</p>
					</a>
				</li>
				<li>
					<a href="#">
						<p>0</p>
						<p>浏览记录</p>
					</a>
				</li>
			</ul>
		</div>
				<mt-cell title="余额">
				<span>{{wallet.money}}</span>
			</mt-cell>
			<mt-cell title="余额明细" is-link :to="{name:'money_detail'}"></mt-cell>
			
		<mt-cell title="我的消息" is-link></mt-cell>
		<mt-cell title="地址管理" is-link :to="{name:'address'}"></mt-cell>
		<mt-cell title="联系客服" is-link></mt-cell>
		<router-link :to="{name:'userPage_seller'}">userPage_seller</router-link>
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
				wallet: {}
			}
		},
		created() {
			if(this.getUsers.u_id==null||this.getUsers.u_id==''){
				this.$router.push({
					name: 'user'
				});
				return
			}
			this.$ajax.get('/my/getwalletById/' + this.getUsers.u_id).then(data => {
				data = data.data;
				this.wallet = data.message[0];
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
	@import url("../../static/css/userPage.css");
</style>