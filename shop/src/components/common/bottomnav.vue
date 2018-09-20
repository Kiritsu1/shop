<template>
	<div id="">
		<mt-tabbar :fixed="flag" v-model="selected" class="tabbar" @click.native="go" v-if="isBottomShow">
			<mt-tab-item id="home">
				<span slot="icon" class="iconfont icon-home-g"></span>
				<p>首页</p>
			</mt-tab-item>
			<mt-tab-item id="sort">
				<span slot="icon" class="iconfont icon-fenlei"></span>
				<p>分类</p>
			</mt-tab-item>
			<mt-tab-item id="shopcart" class="mint-tab-item">
				<span slot="icon" class="iconfont icon-03"></span>
				<p>购物车</p>
			</mt-tab-item>
			<mt-tab-item id="user">
				<span slot="icon" class="iconfont icon-unie611"></span>
				<p>个人中心</p>
			</mt-tab-item>
		</mt-tabbar>
	</div>
</template>

<script>
	import connect from './connect.js';
	export default {
		data() {
			return {
				selected: "home",
				flag: true,
				isBottomShow: true
			}
		},
		created() {
		
			this.selected = this.$route.path.split("/")[1]
		},
		methods: {
			go() {
				this.$router.push({
					name: this.selected
				});

			}
		},
		watch: {
			"$route.path" (val, oldval) {
				this.selected = val.split("/")[1]
			},

		}
	}
</script>

<style scoped="scoped">
	.tabbar {
		border-top: 1px solid #ccc;
		box-shadow: 0 0 10px 0 #aaa;
		color: #929292;
	}
	
	.tabbar span {
		height: 25px;
		font-size: 23px;
		padding-top: 2px;
	}
	
	.tabbar p {
		line-height: 21px;
		font-size: 11px;
	}
</style>