<template>
	<div class="order_list tmpl">
		<myheader title="待处理订单"></myheader>
		<ul class="ordercardlist">
			<li class="" v-for="(order,i) in orderList">
				<div class="order_title">
					<span class="time">{{order.add_time|convertDate}}</span>
					<span class="state">{{prodState[order.state]}}</span>
				</div>
				<div class="order_center clearfix">
					<div class="order_center_left">
						<img :src="order.prod.img_url" alt="" />

					</div>
					<div class="order_center_right">
						<p class="ellipsis2">{{order.prod.prodname}}</p>
						<p>{{order.prod.other}}</p>
						<p>¥{{order.prod.sell_price}}</p>
						<p>x{{order.num}}</p>
					</div>

				</div>
				<div class="sum">
					<span>¥{{order.num*order.prod.sell_price*order.prod.discount}}</span>
					<p>商品总额</p>

				</div>
				<div class="btns clearfix">
					<mt-button type="danger" class="confirm_receipt" @click.prevent='SendOut(order.orderid)' v-if="order.state==1">发货</mt-button>
					<mt-button type="default" class="refund" @click.prevent='refund(i)' v-if="order.state==4">同意退款</mt-button>
					<mt-button type="default" class="order_detail" plain v-if="order.state==1||order.state==2">物流信息</mt-button>
					<mt-button type="default" class="order_detail" plain>订单详情</mt-button>
					<!--<mt-button type="primary" v-if="!statebtn[prod.state]" @click.prevent='putonsell(prod.prodid)' class="putonsell">上架</mt-button>-->
					<!--<mt-button type="primary" v-if="statebtn[prod.state]" @click.prevent='putdownsell(prod.prodid)' class="putonsell">下架</mt-button>-->

				</div>
			</li>
			<!--<mt-button type="default" class="order_detail" plain v-if="aa=='t'" @click>订单详情123</mt-button>-->
		</ul>
	</div>

</template>

<script>
	import prodState from '../../static/vendor/prodState.json'
	export default {
		data() {
			return {
				prodState,
				orderList: '',
				prodList: '',
				shopid: ''
			}
		},
		created() {
			this.load();
		},

		methods: {
			load() {

				this.shopid = this.$route.query.shopid;
				var params = {
					shopid: this.shopid
				};
				if(this.$route.query.state != null) {
					params.state = this.$route.query.state;
				}
				this.$ajax.post("/my/getOrder/", params).then(data => {
						data = data.data
						if(data.status == 0) {
							this.orderList = data.message;
							var ids = [];
							this.orderList.forEach(e => {
								e.prod = JSON.parse(e.prod)
							})
						}else if(data.status==2){
						this.orderList='';
					}  else {
							console.log(data)
						}
					})
					.catch(err => {
						console.log(err)
					})
			},
			SendOut(orderid) {
				this.$ajax.post('/my/updateOrder', {
					orderid,
					state: 2
				}).then(data => {
					data = data.data;
					this.load();
					this.$toast({
						message: '发货成功',
						position: 'center',
						duration: 1000
					});

				})
			},
			refund(i) {

				var order = this.orderList[i];
		
				this.$ajax.all([
						this.$ajax.post("/my/Recharge", {
							u_id: order.u_id,
							money: order.sum
						}),
						this.$ajax.post("/my/Recharge", {
							u_id: order.u_id,
							alreadysettled: -order.sum
						}),
						this.$ajax.post("/my/addMoneyDetail", {
							u_id: order.u_id,
							changenumber: order.sum,
							changeOrigin: "退款"
						}),
						this.$ajax.post('/my/updateOrder', {
							orderid: order.orderid,
							state:5
						})

					])
					.then(this.$ajax.spread((res0, res1, res2,res3) => {
						var arg = [];
						arg.push(res0);
						arg.push(res1);
						arg.push(res2);
						arg.push(res3);

						var flag = true;
						arg.forEach((e, i) => {
							if(e.data.status != 0) {
								console.log(e.data + "第" + i + "个")
								flag = false;
							}

						})
						if(flag) {
							this.load();
							this.$toast({
								message: '退款成功',
								position: 'center',
								duration: 1000
							});
						} else {
							this.load();
							this.$toast({
								message: '退款失败',
								position: 'center',
								duration: 1000
							});
						}
					}))
					.catch(err => {
						console.log(err);
					})

			}
		},

		computed: {
			getUid() {
				return this.$store.getters['loginedUser/getUid'];
			}
		}
	}
</script>

<style scoped>
	@import url("../../static/css/order_list.css");
</style>