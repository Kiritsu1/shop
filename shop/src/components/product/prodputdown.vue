<template>
	<div class="myprod tmpl">
		<myheader title="我的商品"></myheader>
		<ul class="prodList">
			<li v-for="(prod, i) in prodList" :key='prod.prodid'>
				<div class="prod_title">
					<span class="time">{{prod.add_time|convertDate}}</span>
					<span class="state">{{state[prod.state]}}</span>
				</div>
				<div class="prod_center clearfix">
					<div class="prod_center_left">
						<img :src="prod.img_url" alt="" />

					</div>
					<div class="prod_center_right">
						<p class="ellipsis2">{{prod.prodname}}</p>
						<!--<p>颜色：经典款 尺寸：xl</p>-->
						<p>{{prod.other}}</p>
					</div>

				</div>
				<div class="price clearfix">
					<div class="market_price">
						<span>¥{{prod.market_price}}</span>
						<p>市场价</p>

					</div>
					<div class="sell_price">
						<span>¥{{prod.sell_price}}</span>
						<p>销售价</p>

					</div>
					<div class="discount">
						<span>{{prod.discount}}</span>
						<p>折扣</p>

					</div>
					<div class="lastprice">
						<span>¥{{prod.discount*prod.sell_price}}</span>
						<p>最终价格</p>

					</div>
				</div>

				<div class="btns clearfix">
					<mt-button type="primary" v-if="statebtn[prod.state]" @click.prevent='putdownsell(prod.prodid)' class="putonsell">下架</mt-button>
				</div>
			</li>

		</ul>
		<div class="nothing" v-if="isnothing">没有商品正在销售</div>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				state: {
					0: '未上架',
					1: '已上架'
				},
				statebtn: {
					0: false,
					1: true
				},
				shopid: '',
				prodList: [],
				isnothing: false

			}
		},
		created() {
			this.load();
		},
		methods: {
			load() {
				this.shopid = this.$route.query.shopid;
				this.$ajax.post('/my/getprod', {
					shopid: this.shopid,
					state: 1
				}).then(data => {
					data = data.data;

					if(Array.isArray(data.message)) {
						this.prodList = data.message;
					} else {
						this.isnothing = true;
					}

				})
			},
			putdownsell(prodid) {
				this.$ajax.post('/my/updateprod', {
					prodid,
					state: 0
				}).then(data => {
					data = data.data;
					this.load();
					this.$toast({
						message: '下架成功',
						position: 'center',
						duration: 1000
					});

				})
			}
		}
	}
</script>

<style scoped src="../../static/css/myprod.css">

</style>