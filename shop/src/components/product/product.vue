<template>
	<div class="tmpl product">
		<myheader title="商品详情"></myheader>
		<div class="outer-swiper">
			<div class="swiper">
				<mt-swipe>
					<mt-swipe-item>
						<img :src="prodInfo.img_url" />
					</mt-swipe-item>
				</mt-swipe>
			</div>
		</div>
		<div class="product-desc">
			<ul>
				<li>
					<span class="product-desc-span">
						{{prodInfo.prodname}}
					</span>
				</li>
				<li class="price-li">市场价：
					<s>￥{{prodInfo.market_price}}</s> 销售价：
					<span>￥{{prodInfo.sell_price}}</span>
				</li>
				<li class="number-li">购买数量：
					<span>-</span>
					<span>1</span>
					<span>+</span>
				</li>

			</ul>
		</div>
		<div class="product-props">
			<ul>
				<li>商品参数</li>
				<li>商品货号：{{prodInfo.prodid}}</li>
				<li>库存情况{{prodInfo.stock}}件</li>
				<li>上架时间：{{prodInfo.add_time|convertDate}}</li>
			</ul>
		</div>
		<div class="product-info">
			<ul>
				<li>
					<mt-button type="danger" size="large" plain @click="showProdComment">商品评论</mt-button>
				</li>
			</ul>
		</div>
		<div class="pro_introduction">
			<p>商品介绍</p>
			<p> {{prodInfo.descr}}
			</p>
		</div>
		<div class="bottom">
			<div class="shop">
				<span class="iconfont icon-shop"></span>
				<span>店铺</span>
			</div>
			<div class="service">
				<span class="iconfont icon-kefu"></span>
				<span>客服</span>
			</div>
			<div class="addcollect">
				<div class="box">
					<span class="iconfont icon-shou-cang1" v-if="!iscollected" @click="iscollected=!iscollected"></span>
					<span v-if="!iscollected" @click="iscollected=!iscollected">收藏</span>
				</div>
				<div class="box">
					<span v-if="iscollected" @click="iscollected=!iscollected" class="iconfont icon-shou-cang"></span>
					<span v-if="iscollected" @click="iscollected=!iscollected">已收藏</span>
				</div>
			</div>

			<mt-button type="danger" class="addshopcart" @click="addShopcart">加入购物车</mt-button>
			<mt-button type="primary" class="buy">立即购买</mt-button>

		</div>

	</div>
</template>
<script>
	export default {
		data() {
			return {
				iscollected: false,
				prodInfo: {}, //商品信息
				num: 1, //添加购物车的商品数量
				prodid: '',
				shopid: ''
			}
		},
		created() {
			//获取路由参数id
			this.prodid = this.$route.query.prodid;
			this.$ajax.get("/my/getprodByid/" + this.prodid).then(data => {
				console.log(data.data)
				data = data.data.message[0];
				this.prodInfo = data;
			})

		},
		methods: {
			add() {
				if(this.num >= this.prodInfo.stock_quantity) return;
				this.num++
			},
			substract() {
				if(this.num <= 1) return;
				this.num--
			},
			addShopcart() {
				//				console.log(this.num)
				//调用工具对象添加商品
				this.$prodtools.addOrUpdate({
					prodid: this.prodInfo.prodid,
					num: this.num
				})
				this.$toast("添加成功")
				this.num = 1;
			},
			showProdComment() {
				//				let id = this.$route.query.id;
				//				this.$router.push({
				//					name: 'goods.comment',
				//					query: {
				//						id
				//					} //路由参数id
				//				})
			},
			goOrder() {
				//				if(UserTools.checkLogin().username) {
				//					let payment = {
				//						num: this.num,
				//						sum: this.prodInfo.sell_price * this.num
				//					}
				//					let goodsList = [this.prodInfo]
				//					goodsList[0].num = this.num;
				//					goodsList[0].isPicked = true;
				//					this.$router.push({
				//						name: "order",
				//						query: {
				//							payment: payment,
				//							goodsList: goodsList,
				//							from_: "goodsPage"
				//						}
				//					})
				//				} else {
				//					this.$messagebox.confirm('结算前请登录，是否跳转到登录页面', '提示', {
				//
				//						confirmButtonText: '是',
				//						cancelButtonText: '否'
				//					}).then(action => {
				//						this.$router.push({
				//							name: "login",
				//						})
				//					}).catch(err => {});
				//				}
				//
			}
		}
	}
</script>
<style scoped>
	@import url("../../static/css/product.css");
</style>